-- Create the donors table
CREATE TABLE donors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    join_date DATE NOT NULL,
    total_donations INT DEFAULT 0
);

-- Create the donations table
CREATE TABLE donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    donor_id INT NOT NULL,
    food_item VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    expiry_date DATE NOT NULL,
    donation_date DATETIME NOT NULL,
    status ENUM('pending', 'collected', 'distributed') DEFAULT 'pending',
    FOREIGN KEY (donor_id) REFERENCES donors(id)
);

-- Create the donation_centers table
CREATE TABLE donation_centers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20)
);

-- Create the donor_preferences table
CREATE TABLE donor_preferences (
    donor_id INT PRIMARY KEY,
    preferred_center_id INT,
    notification_preference ENUM('email', 'sms', 'both') DEFAULT 'email',
    FOREIGN KEY (donor_id) REFERENCES donors(id),
    FOREIGN KEY (preferred_center_id) REFERENCES donation_centers(id)
);
