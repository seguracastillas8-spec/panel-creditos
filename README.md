from flask import Flask
from flask_cors import CORS
import os

from routes.auth_routes import auth_bp
from routes.creditos_routes import creditos_bp
from routes.public_routes import public_bp

def create_app():
    app = Flask(__name__)

    # Configuración básica
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'secret-key-default')
    app.config['ENV'] = os.environ.get('FLASK_ENV', 'production')

    # CORS
    CORS(app)

    # Registro de Blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(creditos_bp, url_prefix='/api/creditos')
    app.register_blueprint(public_bp, url_prefix='/api/public')

    @app.route('/')
    def health_check():
        return {
            "status": "ok",
            "message": "Sistema de Gestión de Créditos activo"
        }, 200

    return app


app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
