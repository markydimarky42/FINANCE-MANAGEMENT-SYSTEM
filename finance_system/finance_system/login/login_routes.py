from flask import Blueprint, render_template

login_bp = Blueprint('login', __name__)

@login_bp.route('/finance')
def login():
    return render_template('finance_login.html')