INSERT INTO departments (department_name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES  ('Lawyer', '95000.00', 4), 
        ('Software Engineer', '90000.00', 2), 
        ('Accountant', '85000.00', 3),
        ('Customer Service Rep', '65000.00', 1),
        ('Salesperson', '50000.00', 1);


INSERT INTO employees (first_name, last_name, employee_role, manager)
VALUES  ('Sarah', 'Jones', 3, 'Amy Goodall'),
        ('Joseph', 'Garcia', 2, 'Brianna Smith'),
        ('Henry', 'Suzuki', 4, 'Bo Singh'),
        ('Kathy', 'Bennett', 5, 'Bo Singh');


