-- Create the expenses table
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    date DATE NOT NULL
);

-- Optional: Insert some sample data
INSERT INTO expenses (title, amount, category, date) VALUES
('Groceries', 50.00, 'Food', '2023-10-01'),
('Gas', 30.00, 'Transport', '2023-10-02'),
('Movie', 15.00, 'Entertainment', '2023-10-03');