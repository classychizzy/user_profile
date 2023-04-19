create table user (
first_name varchar(255) not null,
last_name varchar (255) not null,
email varchar(255) unique,
created_at DATE,
updated_at DATE,
USERID int PRIMARY KEY AUTO_INCREMENT
);

create table userprofile (
username varchar(255) NOT NULL,
email varchar(255) NOT NULL,
phone_number varchar(25) NOT NULL,
profile int unique,
FOREIGN KEY(profile) 
        REFERENCES user(USERID),
userprofile_Id INT AUTO_INCREMENT PRIMARY KEY
);



create table address (
addressId INT AUTO_INCREMENT PRIMARY KEY,
state varchar(255) NOT NULL,
city varchar(255) NOT NULL,
street varchar(255) NOT NULL,
profile int unique,
FOREIGN KEY(profile) 
        REFERENCES userprofile(profile)
);

