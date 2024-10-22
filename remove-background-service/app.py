from flask import Flask, request, jsonify, send_file, render_template
import logging
import os
import requests
from io import BytesIO
from PIL import Image
from rembg import remove
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

UPLOAD_FOLDER = 'uploads'

def clear_uploads_folder(upload_dir=UPLOAD_FOLDER):
    if os.path.exists(upload_dir):
        for file in os.listdir(upload_dir):
            file_path = os.path.join(upload_dir, file)
            if os.path.isfile(file_path):
                try:
                    os.remove(file_path)
                    logger.info(f"Archivo eliminado: {file_path}")
                except Exception as e:
                    logger.error(f"Error al eliminar {file_path}: {e}")

def save_uploaded_file(uploaded_file, upload_dir=UPLOAD_FOLDER):
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
    clear_uploads_folder(upload_dir)
    file_path = os.path.join(upload_dir, uploaded_file.filename)
    try:
        uploaded_file.save(file_path)
        logger.info(f"Archivo guardado: {file_path}")
        return file_path
    except Exception as e:
        logger.error(f"Error al guardar el archivo: {e}")
        raise e
    
def download_image_from_url(url):
    """Descarga una imagen desde una URL y la guarda temporalmente."""
    try:
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            img = Image.open(BytesIO(response.content))
            file_path = os.path.join('/tmp', 'downloaded_image.png')
            img.save(file_path)
            return file_path
        else:
            raise Exception(f"Error al descargar la imagen. Código de estado: {response.status_code}")
    except Exception as e:
        logger.error(f"No se pudo descargar la imagen desde la URL: {e}")
        raise

def remove_background(image_path):
    output_image_path = os.path.splitext(image_path)[0] + '_rmbg.png'
    try:
        image = Image.open(image_path)
        output = remove(image)
        output.save(output_image_path, 'PNG')
        logger.info(f"Fondo removido: {output_image_path}")
        return output_image_path
    except Exception as e:
        logger.error(f"Error al procesar la imagen {image_path}: {e}")
        return None

@app.route('/', methods=['GET'])
def visit():
    logger.info("App visitada")
    return render_template('welcome.html')

@app.route('/remove-background/', methods=['POST'])
def remove_bg_api():
    
    if 'file' in request.files:
        file = request.files['file']
        logger.info(f"Solicitud recibida: {file.filename}")

        try:
            file_path = save_uploaded_file(file)
        except Exception as e:
            logger.error(f"No se pudo guardar el archivo: {e}")
            return jsonify({"error": "No se pudo guardar el archivo: " + str(e)}), 500

    elif 'url' in request.form:
        image_url = request.form['url']
        logger.info(f"Solicitud recibida con URL: {image_url}")
        
        try:
            file_path = download_image_from_url(image_url)
        except Exception as e:
            logger.error(f"No se pudo descargar la imagen desde la URL: {e}")
            return jsonify({"error": "No se pudo descargar la imagen desde la URL: " + str(e)}), 500

    else:
        return jsonify({"error": "No se encontró ningún archivo o URL en la solicitud."}), 400

    output_image_path = remove_background(file_path)

    if output_image_path:
        logger.info(f"Imagen procesada: {output_image_path}")
        return send_file(output_image_path, mimetype='image/png', as_attachment=True, download_name="processed_image.png")
    else:
        logger.error("Error al procesar la imagen.")
        return jsonify({"error": "Ocurrió un error al procesar la imagen"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0')
