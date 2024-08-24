from flask import Blueprint, render_template, request, redirect, url_for, session
from finance_system.db import mysql

finance_dashboard_bp = Blueprint('finance_dashboard', __name__)

@finance_dashboard_bp.route('/')
def display_dashboard():
    return render_template('contentsdb.html')