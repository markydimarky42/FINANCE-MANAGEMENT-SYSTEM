from flask import Blueprint, jsonify, render_template, request, redirect, url_for, flash
from finance_system.db import mysql

chart_of_accounts_bp = Blueprint('chart_of_accounts', __name__)

@chart_of_accounts_bp.route('/')
def display_chart_of_accounts():
    name_filter = request.args.get('name', '')
    number_filter = request.args.get('number', '')
    type_filter = request.args.get('type', '')
    status_filter = request.args.get('status', 'Non-suspended')

    cursor = mysql.connection.cursor()

    query = """
        SELECT id, account_number, account_name, account_type, account_status
        FROM chart_of_accounts
        WHERE 1=1
    """
    params = []

    if name_filter:
        query += " AND account_name LIKE %s"
        params.append(f"%{name_filter}%")

    try:
        number_filter = int(number_filter)
        query += " AND account_number = %s"
        params.append(number_filter)
    except ValueError:
        pass
    
    if type_filter:
        query += " AND account_type = %s"
        params.append(type_filter)
    
    if status_filter == "Suspended":
        query += " AND account_status = 'deactivated'"
    elif status_filter == "Non-suspended":
        query += " AND account_status = 'active'"

    query += " ORDER BY account_number ASC"

    cursor.execute(query, tuple(params))
    accounts = cursor.fetchall()
    cursor.close()

    return render_template('chart_of_accounts.html', accounts=accounts)

@chart_of_accounts_bp.route('/add_account', methods=['POST'])
def add_account():
    account_number = request.form['account_number']
    account_name = request.form['account_name']
    account_type = request.form['account_type']
    
    cursor = mysql.connection.cursor()
    
    # Check for unique account number and name
    cursor.execute("SELECT id FROM chart_of_accounts WHERE account_number = %s OR account_name = %s", (account_number, account_name))
    duplicate_account = cursor.fetchone()
    
    if duplicate_account:
        flash('Account Number or Account Name already exists. Please choose a unique value.', 'error')
        return redirect(url_for('chart_of_accounts.display_chart_of_accounts'))
    
    try:
        cursor.execute("""
            INSERT INTO chart_of_accounts (account_number, account_name, account_type)
            VALUES (%s, %s, %s)
        """, (account_number, account_name, account_type))
        mysql.connection.commit()
        flash('Account successfully added!', 'success')
    except Exception as e:
        mysql.connection.rollback()
        flash('Error adding account: ' + str(e), 'error')
    finally:
        cursor.close()

    return redirect(url_for('chart_of_accounts.display_chart_of_accounts'))

@chart_of_accounts_bp.route('/edit_account', methods=['POST'])
def edit_account():
    account_id = request.form['account_id']
    account_number = request.form['account_number']
    account_name = request.form['account_name']
    account_type = request.form['account_type']
    
    cursor = mysql.connection.cursor()
    
    # Check for unique account number and name (excluding the current account)
    cursor.execute("""
        SELECT id FROM chart_of_accounts 
        WHERE (account_number = %s OR account_name = %s) AND id != %s
    """, (account_number, account_name, account_id))
    duplicate_account = cursor.fetchone()
    
    if duplicate_account:
        flash('Account Number or Account Name already exists. Please choose a unique value.', 'error')
        return redirect(url_for('chart_of_accounts.display_chart_of_accounts'))
    
    try:
        cursor.execute("""
            UPDATE chart_of_accounts
            SET account_number = %s, account_name = %s, account_type = %s, date_updated = CURRENT_TIMESTAMP
            WHERE id = %s
        """, (account_number, account_name, account_type, account_id))
        mysql.connection.commit()
        flash('Account successfully updated!', 'success')
    except Exception as e:
        mysql.connection.rollback()
        flash('Error updating account: ' + str(e), 'error')
    finally:
        cursor.close()

    return redirect(url_for('chart_of_accounts.display_chart_of_accounts'))

@chart_of_accounts_bp.route('/delete_account', methods=['POST'])
def delete_account():
    account_id = request.form['account_id']
    
    cursor = mysql.connection.cursor()
    try:
        cursor.execute("""
            UPDATE chart_of_accounts
            SET account_status = 'deactivated', date_updated = CURRENT_TIMESTAMP
            WHERE id = %s
        """, (account_id,))
        mysql.connection.commit()
        flash('Account successfully deactivated!', 'success')
    except Exception as e:
        mysql.connection.rollback()
        flash('Error deactivating account: ' + str(e), 'error')
    finally:
        cursor.close()

    return redirect(url_for('chart_of_accounts.display_chart_of_accounts'))
