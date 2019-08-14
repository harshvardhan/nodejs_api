-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: localhost    Database: school_project
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_email` varchar(255) NOT NULL,
  `student_email` varchar(255) NOT NULL,
  `valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `register` (`teacher_email`,`student_email`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
INSERT INTO `register` VALUES (41,'Tom@gmail.com','May@gmail.com',1),(42,'Tom@gmail.com','jerry@gmail.com',1),(43,'Tom@gmail.com','Kestov@gmail.com',1),(44,'Tom@gmail.com','hdjh@kd.com',1),(58,'larry@gmail.com','jerry@gmail.com',1),(59,'gerrad@gmail.com','jerry@gmail.com',1),(60,'gerrad@gmail.com','Kestov@gmail.com',1),(61,'gerrad@gmail.com','Katrin@gmail.com',1),(62,'gerrad@gmail.com','Piniyara@gmail.com',1),(63,'gerrad@gmail.com','Ritz@gmail.com',1),(64,'gerrad@gmail.com','Taz@gmail.com',1),(65,'gerrad@gmail.com','Fensuk@gmail.com',1),(66,'gerrad@gmail.com','Joe@gmail.com',1),(67,'gerrad@gmail.com','Mustafa@gmail.com',1),(69,'Tom@gmail.com','Fensuk@gmail.com',1),(70,'Tom@gmail.com','Taz@gmail.com',1);
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `second_name` varchar(255) DEFAULT NULL,
  `email_id` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users` (`email_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Tom','B. Erichsen','Tom@gmail.com','teacher'),(2,'Jerry','C. Erichdad','jerry@gmail.com','student'),(3,'Larry','Page','larry@gmail.com','teacher'),(4,'Kestov','Nova','Kestov@gmail.com','student'),(5,'Gerrad','Butler','gerrad@gmail.com','teacher'),(6,'Katrin','Korna','Katrin@gmail.com','student'),(7,'Taz','Jared','Taz@gmail.com','student'),(8,'Ritz','Barlord','Ritz@gmail.com','student'),(9,'Piniyara','Laztory','Piniyara@gmail.com','student'),(10,'Fensuk','Wangdu','Fensuk@gmail.com','student'),(11,'Joe','Burns','Joe@gmail.com','student'),(12,'Mustafa','Naz','Mustafa@gmail.com','student'),(13,'Patrik','Lauzart','patrik@gmail.com','teacher'),(14,'May','Joe','May@gmail.com','student'),(15,'Harsh','Vardhan','harsh.020688@gmail.com','student');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-14 21:07:58
