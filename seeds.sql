USE business_db;

INSERT INTO department (name)
VALUES
("IT"),
("Sales"),
("HR"),
("Marketing"),
("Supply Chain"),
("Finance");

INSERT INTO role (title, salary, department_id)
VALUES
("Software Engineer", 85000, 1),
("Sr Software Engineer", 150000, 1),
("Sales Rep", 45000, 2),
("HR Director", 120000, 3),
("PR Specialist", 70000, 4),
("Production Planner", 80000, 5),
("Financial Advisor", 75000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Bianca", "Mamome", 1, 1),
("Braden", "Kim", 2, 7),
("Silvia", "Lanchester", 3, 2),
("Brandt", "Stark", 4, 7),
("Jess", "Snow", 5, 4),
("Stephen", "Wade", 6, 5),
("Steve", "Cangialosi", 7, 6);