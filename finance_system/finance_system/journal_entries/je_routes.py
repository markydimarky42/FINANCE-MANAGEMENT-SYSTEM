import datetime
from flask import Blueprint, render_template, request, redirect, url_for, flash
from finance_system.db import mysql
import uuid

journal_entries_bp = Blueprint('journal_entries', __name__)

# def generate_je_record_number():
#     cursor = mysql.connection.cursor()
#     cursor.execute("SELECT COUNT(id) FROM journal_entries")
#     count = cursor.fetchone()['COUNT(id)']
#     je_record_number = f'JE-{datetime.datetime.now().strftime("%Y%m%d")}-{count + 1}'
#     cursor.close()
    
#     return je_record_number

@journal_entries_bp.route('/')
def journal_entry():
    return render_template('journal_entries.html')

