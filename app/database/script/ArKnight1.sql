-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: arknight_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.27-MariaDB

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
CREATE DATABASE arknight_db;

USE arknight_db;

--
-- Table structure for table `avatares`
--

DROP TABLE IF EXISTS `avatares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatares` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatares`
--

LOCK TABLES `avatares` WRITE;
/*!40000 ALTER TABLE `avatares` DISABLE KEYS */;
/*!40000 ALTER TABLE `avatares` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `banner` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Herramientas Electricas','NULL'),(2,'Herramientas de Mano','NULL'),(3,'Pinturas','NULL'),(4,'Jardin','NULL'),(5,'Decoracion','NULL'),(6,'Plomeria','NULL'),(7,'Electricidad','NULL'),(8,'Ferreteria','NULL');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes_suc`
--

DROP TABLE IF EXISTS `imagenes_suc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes_suc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes_suc`
--

LOCK TABLES `imagenes_suc` WRITE;
/*!40000 ALTER TABLE `imagenes_suc` DISABLE KEYS */;
INSERT INTO `imagenes_suc` VALUES (1,'NULL');
/*!40000 ALTER TABLE `imagenes_suc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordenes`
--

DROP TABLE IF EXISTS `ordenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordenes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `state` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `ordenes_FK` (`user_id`),
  CONSTRAINT `ordenes_FK` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenes`
--

LOCK TABLES `ordenes` WRITE;
/*!40000 ALTER TABLE `ordenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordenes_items`
--

DROP TABLE IF EXISTS `ordenes_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordenes_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `ordenes_items_FK` (`order_id`),
  KEY `ordenes_items_FK_1` (`product_id`),
  CONSTRAINT `ordenes_items_FK` FOREIGN KEY (`order_id`) REFERENCES `ordenes` (`id`),
  CONSTRAINT `ordenes_items_FK_1` FOREIGN KEY (`product_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenes_items`
--

LOCK TABLES `ordenes_items` WRITE;
/*!40000 ALTER TABLE `ordenes_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordenes_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `precio` varchar(100) NOT NULL,
  `cuotas` int(11) DEFAULT NULL,
  `descuento` int(11) DEFAULT NULL,
  `subCategory_id` int(11) NOT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  `imagen_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `productos_FK` (`subCategory_id`),
  KEY `productos_FK_1` (`imagen_id`),
  CONSTRAINT `productos_FK` FOREIGN KEY (`subCategory_id`) REFERENCES `sub_categorias` (`id`),
  CONSTRAINT `productos_FK_1` FOREIGN KEY (`imagen_id`) REFERENCES `imagenes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provincias`
--

DROP TABLE IF EXISTS `provincias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provincias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provincias`
--

LOCK TABLES `provincias` WRITE;
/*!40000 ALTER TABLE `provincias` DISABLE KEYS */;
INSERT INTO `provincias` VALUES (1,'Buenos Aires'),(2,'Entre Rios'),(3,'La Rioja'),(4,'Neuquen'),(5,'Chaco'),(6,'Formosa'),(7,'Misiones'),(8,'Corrientes'),(9,'Salta'),(10,'Jujuy'),(11,'Santa Fe'),(12,'Tucuman'),(13,'Tierra del Fuego'),(14,'Cordoba'),(15,'San Luis'),(16,'Santa Cruz'),(17,'Rio Negro'),(18,'La Pampa'),(19,'Mendoza'),(20,'Chubut'),(21,'San Juan'),(22,'Catamarca'),(23,'Santiago del Estero');
/*!40000 ALTER TABLE `provincias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN'),(2,'USER'),(3,'VENTAS');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_categorias`
--

DROP TABLE IF EXISTS `sub_categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `sub_categorias_FK` (`categoria_id`),
  CONSTRAINT `sub_categorias_FK` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_categorias`
--

LOCK TABLES `sub_categorias` WRITE;
/*!40000 ALTER TABLE `sub_categorias` DISABLE KEYS */;
INSERT INTO `sub_categorias` VALUES (1,'Amoladoras',1),(2,'Agujereadoras',1),(3,'Circulares',1),(4,'Rotomartillos',1),(5,'Soldadoras',1),(6,'Compresores',1),(7,'Atornilladoras',1),(8,'Minitornos',1),(9,'Frezadoras',1),(10,'Hidrolavadoras',1),(11,'Martillos',2),(12,'Prensas',2),(13,'Serruchos',2),(14,'Pinzas y Alicates',2),(15,'Llaves y Tubos',2),(16,'Destornilladores',2),(17,'Medicion',2),(18,'Cajas y Set de Herramientas',2),(19,'Carros y Zorras',2),(20,'Linternas',2),(21,'Latex',3),(22,'Sinteticos',3),(23,'Pinceles',3),(24,'Rodillos',3),(25,'Diluyentes',3),(26,'Masillas',3),(27,'Espatulas',2),(28,'Lijadoras',1),(29,'Entonadores',3),(30,'Barniz',3),(31,'Texturados',3),(32,'Piletas',4),(33,'Parrillas',4),(34,'Camping y Playa',4),(35,'Jardineria',4),(36,'Muebles de Exterior',5),(37,'Muebles de Interior',5),(38,'Bazar',5),(39,'Sabanas y Cortinas',5),(40,'Espejos',5),(41,'Portaretratos',5),(42,'Sanitarios',6),(43,'Griferias',6),(44,'Gas',6),(45,'Agua',6),(46,'Bachas',6),(47,'Mamparas',6),(48,'Accesorios de Baño',6),(49,'Accesorios de Cocina',6),(50,'Tomas y Puntos',7),(51,'Cables',7),(52,'Caños y Cajas',7),(53,'Termicas y Disyuntores',7),(54,'Iluminacion',7),(55,'Aerosoles',3),(56,'Exteriores',7),(57,'Sensores',7),(58,'Aislantes',7),(59,'Clavos',8),(60,'Cintas',8),(61,'Tornillos',8),(62,'Mechas',8),(63,'Cinceles',8),(64,'Terminales',8),(65,'Hojas de Sierra',8),(66,'Discos',8),(67,'Presintos',8),(68,'Buloneria',8),(69,'Adhesivos',8),(70,'Accesorios Minitorno',8);
/*!40000 ALTER TABLE `sub_categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursales`
--

DROP TABLE IF EXISTS `sucursales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sucursales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `altura` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `imagensuc_id` int(11) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `calular` varchar(100) NOT NULL,
  `localidad` varchar(100) NOT NULL,
  `provincia_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `sucursales_FK` (`imagensuc_id`),
  KEY `sucursales_FK_1` (`provincia_id`),
  CONSTRAINT `sucursales_FK` FOREIGN KEY (`imagensuc_id`) REFERENCES `imagenes_suc` (`id`),
  CONSTRAINT `sucursales_FK_1` FOREIGN KEY (`provincia_id`) REFERENCES `provincias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursales`
--

LOCK TABLES `sucursales` WRITE;
/*!40000 ALTER TABLE `sucursales` DISABLE KEYS */;
INSERT INTO `sucursales` VALUES (1,'Lanus','Juncal','2938','lanus_suc@arknight.com.ar',1,'42202020','1133866202','Lanus',1),(2,'CABA','Corrientes','1212','caba_suc@arknight.com.ar',1,'42303030','1122334455','CABA',1),(3,'La Plata','CALLE 11','555','laplata_suc@arknight.com.ar',1,'42404040','1133225544','La Plata',1),(4,'Tucuman','Concepcion','1356','tucuman_suc@arknight.com.ar',1,'3562012523','35615243625','Concepcion',12);
/*!40000 ALTER TABLE `sucursales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `avatar_id` int(11) NOT NULL,
  `telefono` varchar(100) DEFAULT NULL,
  `codigo_postal` varchar(100) DEFAULT NULL,
  `provincia_id` int(11) NOT NULL,
  `localidad` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `usuarios_FK` (`provincia_id`),
  KEY `usuarios_FK_1` (`rol_id`),
  KEY `usuarios_FK_2` (`avatar_id`),
  CONSTRAINT `usuarios_FK` FOREIGN KEY (`provincia_id`) REFERENCES `provincias` (`id`),
  CONSTRAINT `usuarios_FK_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `usuarios_FK_2` FOREIGN KEY (`avatar_id`) REFERENCES `avatares` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'arknight_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-15 19:07:21
