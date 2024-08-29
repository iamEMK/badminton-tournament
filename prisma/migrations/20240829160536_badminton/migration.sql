-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'OFFICIAL', 'COACH', 'VIEWER') NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Season` (
    `id` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Season_year_key`(`year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tournament` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `venue` VARCHAR(191) NOT NULL,
    `category` ENUM('SUPER_1000', 'SUPER_750', 'SUPER_500', 'SUPER_300', 'SUPER_100', 'WORLD_TOUR_FINALS', 'WORLD_CHAMPIONSHIPS', 'OLYMPIC_GAMES', 'CONTINENTAL_CHAMPIONSHIPS', 'OTHER') NOT NULL,
    `totalPrizeMoney` DECIMAL(10, 2) NOT NULL,
    `seasonId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` VARCHAR(191) NOT NULL,
    `name` ENUM('MENS_SINGLES', 'WOMENS_SINGLES', 'MENS_DOUBLES', 'WOMENS_DOUBLES', 'MIXED_DOUBLES') NOT NULL,
    `tournamentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Player` (
    `id` VARCHAR(191) NOT NULL,
    `bwfId` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    `handedness` ENUM('RIGHT', 'LEFT') NOT NULL DEFAULT 'RIGHT',
    `height` INTEGER NULL,
    `playingStatus` ENUM('ACTIVE', 'INJURED', 'RETIRED', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE',

    UNIQUE INDEX `Player_bwfId_key`(`bwfId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerStats` (
    `id` VARCHAR(191) NOT NULL,
    `playerId` VARCHAR(191) NOT NULL,
    `currentWorldRanking` INTEGER NULL,
    `highestWorldRanking` INTEGER NULL,
    `matchesPlayed` INTEGER NOT NULL DEFAULT 0,
    `matchesWon` INTEGER NOT NULL DEFAULT 0,
    `totalPoints` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `PlayerStats_playerId_key`(`playerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entry` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `seeding` INTEGER NULL,
    `status` ENUM('CONFIRMED', 'WAITLISTED', 'WITHDRAWN') NOT NULL DEFAULT 'CONFIRMED',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Match` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `round` ENUM('QUALIFICATION', 'ROUND_OF_64', 'ROUND_OF_32', 'ROUND_OF_16', 'QUARTER_FINAL', 'SEMI_FINAL', 'FINAL') NOT NULL,
    `courtNumber` INTEGER NULL,
    `status` ENUM('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'WALKOVER', 'RETIRED', 'CANCELLED') NOT NULL DEFAULT 'SCHEDULED',
    `scheduledTime` DATETIME(3) NOT NULL,
    `actualStartTime` DATETIME(3) NULL,
    `endTime` DATETIME(3) NULL,
    `winner` VARCHAR(191) NULL,
    `umpire` VARCHAR(191) NULL,
    `serviceJudge` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Set` (
    `id` VARCHAR(191) NOT NULL,
    `matchId` VARCHAR(191) NOT NULL,
    `setNumber` INTEGER NOT NULL,
    `team1Score` INTEGER NOT NULL,
    `team2Score` INTEGER NOT NULL,
    `duration` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rally` (
    `id` VARCHAR(191) NOT NULL,
    `setId` VARCHAR(191) NOT NULL,
    `rallyNumber` INTEGER NOT NULL,
    `servingPlayerId` VARCHAR(191) NOT NULL,
    `winningPlayerId` VARCHAR(191) NOT NULL,
    `scoringShot` ENUM('SMASH', 'DROP', 'CLEAR', 'DRIVE', 'NET_SHOT', 'SERVE', 'LOB', 'SLICE') NULL,
    `duration` INTEGER NULL,
    `returningPlayerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchPlayerStats` (
    `id` VARCHAR(191) NOT NULL,
    `matchId` VARCHAR(191) NOT NULL,
    `playerId` VARCHAR(191) NOT NULL,
    `pointsScored` INTEGER NOT NULL,
    `smashes` INTEGER NOT NULL,
    `drops` INTEGER NOT NULL,
    `netShots` INTEGER NOT NULL,
    `errors` INTEGER NOT NULL,
    `servingScore` INTEGER NOT NULL,
    `receivingScore` INTEGER NOT NULL,

    UNIQUE INDEX `MatchPlayerStats_matchId_playerId_key`(`matchId`, `playerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchReport` (
    `id` VARCHAR(191) NOT NULL,
    `matchId` VARCHAR(191) NOT NULL,
    `highlights` TEXT NOT NULL,
    `keyTurningPoints` TEXT NOT NULL,
    `playerPerformance` TEXT NOT NULL,

    UNIQUE INDEX `MatchReport_matchId_key`(`matchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EntryToPlayer` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_EntryToPlayer_AB_unique`(`A`, `B`),
    INDEX `_EntryToPlayer_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tournament` ADD CONSTRAINT `Tournament_seasonId_fkey` FOREIGN KEY (`seasonId`) REFERENCES `Season`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_tournamentId_fkey` FOREIGN KEY (`tournamentId`) REFERENCES `Tournament`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerStats` ADD CONSTRAINT `PlayerStats_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entry` ADD CONSTRAINT `Entry_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Match` ADD CONSTRAINT `Match_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Set` ADD CONSTRAINT `Set_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Match`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rally` ADD CONSTRAINT `Rally_setId_fkey` FOREIGN KEY (`setId`) REFERENCES `Set`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchPlayerStats` ADD CONSTRAINT `MatchPlayerStats_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Match`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchPlayerStats` ADD CONSTRAINT `MatchPlayerStats_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchReport` ADD CONSTRAINT `MatchReport_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Match`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EntryToPlayer` ADD CONSTRAINT `_EntryToPlayer_A_fkey` FOREIGN KEY (`A`) REFERENCES `Entry`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EntryToPlayer` ADD CONSTRAINT `_EntryToPlayer_B_fkey` FOREIGN KEY (`B`) REFERENCES `Player`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
