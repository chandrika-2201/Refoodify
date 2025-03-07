-- Create the volunteers table
CREATE TABLE volunteers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    join_date DATE NOT NULL,
    tasks_completed INT DEFAULT 0,
    points INT DEFAULT 0
);

-- Create the tasks table
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status ENUM('available', 'assigned', 'completed') DEFAULT 'available',
    created_at DATETIME NOT NULL,
    assigned_to INT,
    completed_at DATETIME,
    FOREIGN KEY (assigned_to) REFERENCES volunteers(id)
);

-- Create the donation_camps table
CREATE TABLE donation_camps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    organizer_id INT NOT NULL,
    status ENUM('proposed', 'approved', 'completed') DEFAULT 'proposed',
    FOREIGN KEY (organizer_id) REFERENCES volunteers(id)
);

-- Create the volunteer_skills table
CREATE TABLE volunteer_skills (
    volunteer_id INT NOT NULL,
    skill VARCHAR(50) NOT NULL,
    PRIMARY KEY (volunteer_id, skill),
    FOREIGN KEY (volunteer_id) REFERENCES volunteers(id)
);
