from database import (
    create_table,
    add_expense,
    get_all_expenses,
    get_total_by_category,
    delete_expense
)


def show_menu():
    print("\nPersonal Expense Tracker")
    print("1. Add expense")
    print("2. View all expenses")
    print("3. View totals by category")
    print("4. Delete an expense")
    print("5. Exit")

def main():
    create_table()

    while True:
        show_menu()
        choice = input("Choose an option (1-5): ")

        if choice == "1":
            amount = float(input("Enter amount: "))
            category = input("Enter category: ")
            date = input("Enter date (YYYY-MM-DD): ")
            note = input("Enter note (optional): ")

            add_expense(amount, category, date, note)
            print("Expense added successfully.")

        elif choice == "2":
            expenses = get_all_expenses()
            print("\nAll Expenses:")
            for exp in expenses:
                print(exp)

        elif choice == "3":
            totals = get_total_by_category()
            print("\nTotals by Category:")
            for category, total in totals:
                print(f"{category}: ${total:.2f}")

        elif choice == "4":
            expense_id = int(input("Enter expense ID to delete: "))
            delete_expense(expense_id)
            print("Expense deleted.")

        elif choice == "5":
            print("ok then lil bro")
            break

        else:
            print("Invalid choice. Please try again.")


if __name__ == "__main__":
    main()

