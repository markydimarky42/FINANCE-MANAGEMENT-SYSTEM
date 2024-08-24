import datetime
from flask import Blueprint, render_template, request, redirect, url_for, flash
from finance_system.db import mysql
import uuid

journal_entries_bp = Blueprint('journal_entries', __name__)

@journal_entries_bp.route('/')
def journal_entry():
    return render_template('journal_entries.html')