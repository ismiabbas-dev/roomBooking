create table if not exists mydb.Room
(
    RoomID     int           not null auto_increment,
    RoomNumber int           null,
    RoomType   varchar(10)   null,
    RoomStatus int default 1 null,
    primary key (RoomID)
);

create table if not exists mydb.User
(
    UserID   int          not null auto_increment,
    Name     varchar(50)  null,
    Email    varchar(100) null,
    Password varchar(255) null,
    Role     varchar(10)  null,
    Photo    varchar(255) null,
    primary key (UserID)
);

create table if not exists mydb.Booking
(
    BookingID     int           not null auto_increment,
    RoomID        int           null,
    UserID        int           null,
    BookingStatus int default 0 null,
    primary key (BookingID),
    constraint booking_ibfk_1
        foreign key (RoomID) references mydb.Room (RoomID),
    constraint booking_ibfk_2
        foreign key (UserID) references mydb.User (UserID)
);

create index RoomID
    on mydb.Booking (RoomID);

create index UserID
    on mydb.Booking (UserID);
