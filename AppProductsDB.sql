CREATE TABLE Categories (
	Id SERIAL PRIMARY KEY,
	Name VARCHAR(100) NOT NULL UNIQUE
);
 
CREATE TABLE Products (
	Id SERIAL PRIMARY KEY,
	Name VARCHAR(255) NOT NULL,
	Price DECIMAL(10, 2) NOT NULL,
	CategoryId INT NOT NULL,
	CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (CategoryId) REFERENCES Categories(Id) ON DELETE CASCADE
);
 
CREATE TABLE ProductDetails(
	Id SERIAL PRIMARY KEY,
	ProductId INT NOT NULL,
	Description TEXT NOT NULL,
	Stock INT DEFAULT 0,
	Weight DECIMAL(10, 2),
	Dimensions VARCHAR(100),
	FOREIGN KEY (ProductId) REFERENCES Products(Id) ON DELETE CASCADE
);
 
INSERT INTO Categories(Name) VALUES ('Electronicos'), ('Calzado'), ('Insumos');
 
SELECT * FROM Categories;
 
INSERT INTO Products (Name, Price, CategoryId) VALUES ('Iphone 16 pro max', 699.99, 1);
 
SELECT * FROM Products;