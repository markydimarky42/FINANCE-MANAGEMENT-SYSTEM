from flask import Blueprint, render_template, request, redirect, url_for
from finance_system.db import mysql

general_ledger_listings_bp = Blueprint('general_ledger_listings', __name__)