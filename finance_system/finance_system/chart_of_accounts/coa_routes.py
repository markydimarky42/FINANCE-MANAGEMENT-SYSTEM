from flask import Blueprint, jsonify, render_template, request, redirect, url_for
from finance_system.db import mysql

chart_of_accounts_bp = Blueprint('chart_of_accounts', __name__)

@chart_of_accounts_bp.route('/')
def display_chart_of_accounts():
    # Get filter parameters from request
    name_filter = request.args.get('name', '')
    type_filter = request.args.get('type', '')
    status_filter = request.args.get('status', 'Non-suspended')  # Default to Non-suspended

    cursor = mysql.connection.cursor()

    # Build the base query with filters
    query = """
        SELECT id, account_number, account_name, account_type, account_status
        FROM chart_of_accounts
        WHERE 1=1
    """
    params = []

    if name_filter:
        query += " AND account_name LIKE %s"
        params.append(f"%{name_filter}%")
    
    if type_filter:
        query += " AND account_type = %s"
        params.append(type_filter)
    
    if status_filter == "Suspended":
        query += " AND account_status = 'deactivated'"
    elif status_filter == "Non-suspended":
        query += " AND account_status = 'active'"

    query += " ORDER BY account_number ASC"

    # Execute query
    cursor.execute(query, tuple(params))
    accounts = cursor.fetchall()
    cursor.close()

    # Render the template with the accounts
    return render_template('chart_of_accounts.html', accounts=accounts)

@chart_of_accounts_bp.route('/add_account', methods=['POST'])
def add_account():
    # Retrieve form data
    account_number = request.form['account_number']
    account_name = request.form['account_name']
    account_type = request.form['account_type']
    
    cursor = mysql.connection.cursor()
    try:
        # Insert new account
        cursor.execute("""
            INSERT INTO chart_of_accounts (account_number, account_name, account_type)
            VALUES (%s, %s, %s)
        """, (account_number, account_name, account_type))
        mysql.connection.commit()
    except Exception as e:
        mysql.connection.rollback()
        print("Error adding account:", e)
    finally:
        cursor.close()

    return redirect(url_for('chart_of_accounts.display_chart_of_accounts'))

@chart_of_accounts_bp.route('/edit_account', methods=['POST'])
def edit_account():
    # Retrieve form data
    account_id = request.form['account_id']
    account_number = request.form['account_number']
    account_name = request.form['account_name']
    account_type = request.form['account_type']
    
    cursor = mysql.connection.cursor()
    try:
        # Update account details
        cursor.execute("""
            UPDATE chart_of_accounts
            SET account_number = %s, account_name = %s, account_type = %s, date_updated = CURRENT_TIMESTAMP
            WHERE id = %s
        """, (account_number, account_name, account_type, account_id))
        mysql.connection.commit()
    except Exception as e:
        mysql.connection.rollback()
        print("Error updating account:", e)
    finally:
        cursor.close()

    return redirect(url_for('chart_of_accounts.display_chart_of_accounts'))

@chart_of_accounts_bp.route('/delete_account', methods=['POST'])
def delete_account():
    # Retrieve account ID to deactivate
    account_id = request.form['account_id']
    
    cursor = mysql.connection.cursor()
    try:
        # Deactivate account
        cursor.execute("""
            UPDATE chart_of_accounts
            SET account_status = 'deactivated', date_updated = CURRENT_TIMESTAMP
            WHERE id = %s
        """, (account_id,))
        mysql.connection.commit()
    except Exception as e:
        mysql.connection.rollback()
        print("Error deactivating account:", e)
    finally:
        cursor.close()

    return redirect(url_for('chart_of_accounts.display_chart_of_accounts'))
