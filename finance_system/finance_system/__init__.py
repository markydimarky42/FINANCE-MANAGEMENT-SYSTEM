from flask import Flask
from finance_system.chart_of_accounts.coa_routes import chart_of_accounts_bp
from finance_system.general_ledger_listings.gll_routes import general_ledger_listings_bp
from finance_system.journal_entries.je_routes import journal_entries_bp
from finance_system.finance_dashboard.fd_routes import finance_dashboard_bp
from finance_system.login.login_routes import login_bp
from finance_system.db import mysql
from finance_system.config.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    mysql.init_app(app)

    app.register_blueprint(chart_of_accounts_bp, url_prefix='/chart_of_accounts')
    app.register_blueprint(general_ledger_listings_bp, url_prefix='/general_ledger_listings')  # Corrected typo
    app.register_blueprint(journal_entries_bp, url_prefix='/journal_entries')
    app.register_blueprint(finance_dashboard_bp, url_prefix='/finance_dashboard')
    app.register_blueprint(login_bp, url_prefix='/login')

    return app