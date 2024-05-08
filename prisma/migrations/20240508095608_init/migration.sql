-- CreateTable
CREATE TABLE `Library` (
    `library_id` INTEGER NOT NULL,
    `library_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Library_library_id_key`(`library_id`),
    PRIMARY KEY (`library_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `genre_id` INTEGER NOT NULL,
    `genre_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Genre_genre_id_key`(`genre_id`),
    PRIMARY KEY (`genre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `book_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `genre_id` INTEGER NOT NULL,
    `library_id` INTEGER NOT NULL,

    UNIQUE INDEX `Book_book_id_key`(`book_id`),
    PRIMARY KEY (`book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_user_id_key`(`user_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Loan` (
    `loan_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `book_id` INTEGER NOT NULL,
    `loan_date` DATETIME(3) NOT NULL,
    `due_date` DATETIME(3) NOT NULL,
    `return_date` DATETIME(3) NULL,
    `loan_status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Loan_loan_id_key`(`loan_id`),
    PRIMARY KEY (`loan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hold` (
    `hold_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `book_id` INTEGER NOT NULL,
    `hold_date` DATETIME(3) NOT NULL,
    `release_date` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Hold_hold_id_key`(`hold_id`),
    PRIMARY KEY (`hold_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Library_books` (
    `lib_book_id` INTEGER NOT NULL AUTO_INCREMENT,
    `library_id` INTEGER NOT NULL,
    `book_id` INTEGER NOT NULL,

    PRIMARY KEY (`lib_book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_genre_id_fkey` FOREIGN KEY (`genre_id`) REFERENCES `Genre`(`genre_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_library_id_fkey` FOREIGN KEY (`library_id`) REFERENCES `Library`(`library_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Loan` ADD CONSTRAINT `Loan_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Loan` ADD CONSTRAINT `Loan_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Book`(`book_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hold` ADD CONSTRAINT `Hold_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hold` ADD CONSTRAINT `Hold_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Book`(`book_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Library_books` ADD CONSTRAINT `Library_books_library_id_fkey` FOREIGN KEY (`library_id`) REFERENCES `Library`(`library_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Library_books` ADD CONSTRAINT `Library_books_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Book`(`book_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
