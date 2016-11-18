CREATE TABLE status (
	name VARCHAR(10) PRIMARY KEY,
	sort_order INTEGER
	);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  description VARCHAR(100) NOT NULL,
  due_date DATE NOT NULL,
  status_name VARCHAR(10) REFERENCES status,
  done_date DATE
);

INSERT INTO status (name, sort_order)
VALUES ('Open', 1),
('Closed', 2);

INSERT INTO todos (description, due_date, status_name)
VALUES ('Clean Car', '11-18-2016', 'Open'),
('Lutefisk Dinner', '11-19-2016', 'Open'),
('Bake Pumpkin Pie', '11-23-2016', 'Open'),
('Roast Turkey', '11-24-2016', 'Open'),
('Christmas', '12-25-2016', 'Open');

INSERT INTO todos (description, due_date, status_name, done_date)
VALUES 
('Laundry', '11-15-2016', 'Closed', '11-15-2016'),
('Clean Bathroom', '11-16-2016', 'Closed', '11-17-2016');

SELECT * FROM status;

SELECT * FROM todos;

SELECT * FROM todos
JOIN status ON todos.status_name = status.name
ORDER BY status.sort_order
;
