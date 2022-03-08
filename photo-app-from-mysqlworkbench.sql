-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: photo_app
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` VALUES (1,'Photos of the rapline',1),(2,'Selfies',1),(3,'This is Jooheon\'s album',1),(4,'Selfies of H-won',2),(5,'Vocalline',2),(6,'Vocalline',2),(7,'The wolf of Monsta X',3),(8,'Jooheon\'s family',1);
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `albums_photos`
--

DROP TABLE IF EXISTS `albums_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums_photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `album_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `album_id` (`album_id`),
  KEY `photo_id` (`photo_id`),
  CONSTRAINT `albums_photos_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`),
  CONSTRAINT `albums_photos_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums_photos`
--

LOCK TABLES `albums_photos` WRITE;
/*!40000 ALTER TABLE `albums_photos` DISABLE KEYS */;
INSERT INTO `albums_photos` VALUES (1,1,1),(3,1,3),(4,1,3),(5,2,3),(6,1,3),(7,7,9),(8,7,10),(9,7,11),(10,7,12),(11,7,13),(12,7,14),(13,7,15),(14,7,16),(15,1,17);
/*!40000 ALTER TABLE `albums_photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `user_id` int(11) NOT NULL,
  `url` varchar(2083) NOT NULL,
  `comment` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (1,'Jooheon updated his photo',1,'url to image','No comment'),(2,'This is Hyungwon\'s photo',2,'url to image',''),(3,'Me the bee',1,'url to image','At a fansign'),(4,'The bee and the cat',1,'url to image',NULL),(5,'Jooheon added photo with HW\'s ID',2,'url to image',NULL),(6,'Jooheon added photo with his own ID',1,'url to image',NULL),(7,'Jooheon added photo a second photo with HW\'s ID',1,'url to image',NULL),(8,'This photo should be approved',1,'url to image',NULL),(9,'Kitten',3,'https://get.musti.media/shops/mse/resources/ftp/original/c5/570da4c15b5c87c093ae0a9461b291.jpg',NULL),(10,'Second kitten',3,'https://icatcare.org/app/uploads/2018/07/Helping-your-new-cat-or-kitten-settle-in-1.png',NULL),(11,'Third kitten',3,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F34%2F2018%2F05%2F12170411%2Fcat-kitten-138468381.jpg&q=60',NULL),(12,'Forth kitten',3,'https://static.posters.cz/image/1300/fototapet/cute-kitten-i77094.jpg',NULL),(13,'Fifth kitten',3,'https://www.comfortzone.com/-/media/Images/ComfortZone-NA/US/Blog/bringing-new-kitten-home.jpg',NULL),(14,'Sixth kitten',3,'https://kb.rspca.org.au/wp-content/uploads/2018/11/kitten-in-bed.jpg',NULL),(15,'Sixth kitten',3,'https://vitapet.com/media/y0vhadai/kitten-toilet-training-1240x640.jpg',NULL),(16,'White kitten',3,'https://www.thesprucepets.com/thmb/beAAL4NaD8_zLL0BM13Tv6IbqV0=/1500x1000/filters:fill(auto,1)/kitten-56a09ff83df78cafdaa36304.jpg',NULL),(17,'Bee',1,'https://img.pixers.pics/pho_wat(s3:700/FO/44/11/69/83/700_FO44116983_342981cba0815d70bf89a552fe4ffa34.jpg,700,574,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,524,jpg)/fototapeter-sot-bee-character.jpg.jpg','it\'s cute');
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `last_name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'honey@email.com','$2b$10$NVbdKatlQVfOeMuNZyPp9eRVZxOzwM.DB69EOc8F3tdVp9b0jiIdW','Jooheon','Lee'),(2,'hwon@email.com','$2b$10$/Vqh1Bd861sZy.9rge/bwefmjVhvKcBv4JHuej5LPEdudJ1aRM59m','Hyungwon','Chae'),(3,'imchangkyun@email.com','$2b$10$/H4Y7ApAe1DvzkAmpLQQnu18d/KBe0aYuEtd23.5PKRwtQF4fjGLe','Changkyun','Imm');
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

-- Dump completed on 2022-03-08 23:35:53
