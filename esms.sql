-- create data base:
 -- create database esms

-- create admin table

CREATE TABLE `esms`.`admins` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(100) NULL,
  `password` VARCHAR(200) NULL,
  `mobilenum` VARCHAR(45) NULL,
  `otp` VARCHAR(20) NULL,
  `profilepic` VARCHAR(150) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `adminscol_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);
  
  ALTER TABLE `esms`.`admins` 
ADD COLUMN `fname` VARCHAR(50) NULL AFTER `profilepic`,
ADD COLUMN `mname` VARCHAR(50) NULL AFTER `fname`,
ADD COLUMN `address` VARCHAR(250) NULL AFTER `mname`;

-- create STUDENT table :

CREATE TABLE `esms`.`student` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `rollnumber` INT NULL,
  `class` VARCHAR(45) NULL DEFAULT 'none',
  `fname` VARCHAR(45) NULL DEFAULT 'none',
  `mname` VARCHAR(45) NULL DEFAULT 'none',
  `moblie` INT NULL DEFAULT 00000,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `rollnumber_UNIQUE` (`rollnumber` ASC) VISIBLE);

-- alter in student
ALTER TABLE `esms`.`student` 
CHANGE COLUMN `password` `password` VARCHAR(200) NULL DEFAULT NULL ;

ALTER TABLE `esms`.`student` 
ADD COLUMN `username` VARCHAR(45) NULL AFTER `id`;

ALTER TABLE `esms`.`student` 
ADD COLUMN `otp` INT NULL AFTER `password`,
ADD COLUMN `profilepic` VARCHAR(200) NULL AFTER `otp`;

ALTER TABLE `esms`.`student` 
CHANGE COLUMN `otp` `otp` VARCHAR(20) NULL DEFAULT NULL ;
ALTER TABLE `esms`.`student` 
ADD COLUMN `DoB` VARCHAR(45) NULL AFTER `profilepic`,
ADD COLUMN `address` VARCHAR(250) NULL AFTER `DoB`;




-- enter data in table:

INSERT INTO `esms`.`student` (	`username` ,`name`, `rollnumber`, `class`, `fname`, `mname`, `moblie`, `email`, `password`) VALUES ('student','student', '1', 'vi', 'ram', 'sita', '000', 'verkavikrant7272@gmail.com','$2b$10$dt4zAFKv7maVlqMBqFf7veEanwfgEus52DPFI/W9hEdCU1EOAQbPq');




-- CREATE TEACHER TABLE:

CREATE TABLE `esms`.`teacher` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL DEFAULT 'NA',
  `password` VARCHAR(45) NULL DEFAULT 'NA',
  `mobile` INT NULL DEFAULT 000,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);


-- alter in techer tabl
ALTER TABLE `esms`.`teacher` 
CHANGE COLUMN `password` `password` VARCHAR(200) NULL DEFAULT 'NA' ;

ALTER TABLE `esms`.`teacher` 
ADD COLUMN `name` VARCHAR(45) NULL AFTER `username`,
ADD COLUMN `fname` VARCHAR(45) NULL AFTER `mobile`,
ADD COLUMN `mname` VARCHAR(45) NULL AFTER `fname`,
ADD COLUMN `otp` INT NULL AFTER `mname`,
ADD COLUMN `profilepic` VARCHAR(45) NULL AFTER `otp`,
ADD COLUMN `teachercol` VARCHAR(200) NULL AFTER `profilepic`;

ALTER TABLE `esms`.`teacher` 
CHANGE COLUMN `otp` `otp` VARCHAR(20) NULL DEFAULT NULL ;
ALTER TABLE `esms`.`student` 
ADD COLUMN `gender` VARCHAR(45) NULL AFTER `address`,
CHANGE COLUMN `moblie` `mobile` INT NULL DEFAULT '0' ;
ALTER TABLE `esms`.`teacher` 
ADD COLUMN `gender` VARCHAR(45) NULL AFTER `profilepic`,
ADD COLUMN `DoB` VARCHAR(45) NULL AFTER `gender`,
ADD COLUMN `inchargeof` VARCHAR(45) NULL AFTER `DoB`,
CHANGE COLUMN `teachercol` `address` VARCHAR(200) NULL DEFAULT NULL ;



						-- INSERT DEMO DATA:

INSERT INTO `esms`.`teacher` (`id`, `username`, `email`, `password`, `mobile`) VALUES ('1', 'teacher', 'verkavikrant727@gmail.com', '$2b$10$dt4zAFKv7maVlqMBqFf7veEanwfgEus52DPFI/W9hEdCU1EOAQbPq', '123456');


-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------			--
-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------			--

					
                    


-- ================================================================ -- Create the Class And Subject -- ==================================================================================== --

CREATE TABLE class (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(100) NOT NULL,
    session_year VARCHAR(100) NOT NULL
);
CREATE TABLE subject (
    subject_id INT AUTO_INCREMENT,
    subject_name VARCHAR(100) NOT NULL,
    subject_code VARCHAR(100) NOT NULL,
    PRIMARY KEY (subject_id, subject_code),
    UNIQUE KEY unique_subject_code (subject_code)
);

CREATE TABLE class_subject (
    class_id INT,
    subject_code VARCHAR(100),
    PRIMARY KEY (class_id, subject_code),
    FOREIGN KEY (class_id) REFERENCES class(class_id),
    FOREIGN KEY (subject_code) REFERENCES subject(subject_code)
);


-- ================================================================  ADD ANNOUNCEMENT DATA  ==================================================================================== --


CREATE TABLE `esms`.`announcement` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `date` VARCHAR(45) NOT NULL,
  `discription` VARCHAR(600) NOT NULL,
  `advtNo` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC) VISIBLE);

ALTER TABLE `esms`.`announcement` 
CHANGE COLUMN `advtNo` `advtNo` VARCHAR(45) NULL DEFAULT NULL AFTER `id`;

-- ========================================== CONTECT TABLE =========================================================== --

CREATE TABLE `esms`.`contect` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` VARCHAR(45) NULL,
  `name` VARCHAR(50) NOT NULL DEFAULT 'none',
  `email` VARCHAR(100) NOT NULL DEFAULT 'none',
  `mobile` VARCHAR(40) NOT NULL DEFAULT 'none',
  `message` VARCHAR(250) NOT NULL DEFAULT 'none',
  PRIMARY KEY (`id`));
