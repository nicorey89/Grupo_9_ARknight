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
INSERT INTO `categorias` VALUES (1,'Herramientas Electricas','NULL'),(2,'Herramientas de Mano','NULL'),(3,'Pinturas','NULL'),(4,'Jardin','NULL'),(8,'Ferreteria','NULL');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
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
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
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
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
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
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `productos_FK` (`subCategory_id`),
  CONSTRAINT `productos_FK` FOREIGN KEY (`subCategory_id`) REFERENCES `sub_categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Taladro Percutor Bosch','450w 10mm ','23073',3,10,2,'Potencia absorbida 450w      Velocidad 0 - 3100 rpm         Impacto 0 - 49600 rpm        Peso sin cable 1.2 kg       Incluye: llave de mandril, un año de garantia',NULL,'2023-04-19 02:25:59','1678759996449_products_.jpg'),(2,'Rotomartillo DeWalt','800w 2.6 joules 26mm','77598',6,0,4,'Potencia 800 W        Impacto 2.6 J      peso 2.6 kg        Porta herramientas SDS-Plus        Impactos por minuto 0-5500 ipm',NULL,NULL,'rotomartillo-deWalt-2.jpg'),(3,'Amoladora Angular Black & Decker ','820w 115mm','16011',3,15,1,'Velocidad 11000rpm     Eje de 5/8\" - 11/m 14          Empuñadura lateral 3 posiciones       Traba eje manual        Incluye 1 disco abrasivo, llave, empuñadura lateral',NULL,NULL,'amoladora-angular.jpg'),(4,'Motosierra Electrica Black & Decker','1850w 40cm','53886',6,20,71,'Ajuste de cadena        Freno anti-retroceso         longitud max de corte 40cm     Potencia 1850w       Velocidad 5500/min rpm         Peso 6kg',NULL,NULL,'motocierra-b+d.jpg'),(5,'Atornillador Inalambrico Lusqtoff','18v 2 baterias','53559',3,10,7,'Bateria 2.0 Ah      Voltaje 18v      mandril 1-10mm         Torque 25N.m      Peso 3.2kg        Incluye: cargador, 2 baterias, maletin',NULL,NULL,'atornillador_inalambrico_lusqtoff.jpg'),(6,'Podadora Cortacesped inalambrica Black & Decker','20v','33834',3,5,35,'Potencia 20V        Ancho de corte 25.4cm        Velocidad 9000 rpm         Sistema de alineacion Automatico         Incluye: guarda, bateria de 20v cargador',NULL,NULL,'podadora_b+d.jpg'),(7,'Sierra Circular Lusqtoff','1/4\" 1500w','21201',3,10,3,'Potencia 1500w        Diametro 185mm        Velocidad 5500rpm       profundidad de corte  63.5mm       peso 4.4kg','2023-04-20 02:19:08','2023-04-20 02:19:08','1681957148436_products_.jpg'),(8,'Soldadora Inverter Stanley','160A con maletin','52368',6,15,5,'Corriente de soldadura 30-140A~160A max       Electrodo min-max 1.6-4mm        peso caja 5.8kg      no incluye mascara','2023-04-20 02:28:51','2023-05-25 18:20:22','1681957731757_products_.jpg'),(9,'Compresor lusqtoff','100lts 3HP 78kg','207459',6,20,6,'Potencia 3HP      Capacidad 100 litros        Caudal 335L/min      Precion 115psi      Peso 78kg      Garantia de fabrica 2 años','2023-04-20 02:31:44','2023-04-20 02:31:44','1681957904781_products_.jpg'),(10,'Minitorno Dremmel','130w + accesorios','27810',3,5,8,'Potencia 130W     Velocidad 10000~32000rpm     incluye 30 accesorios       Garantia 2 años','2023-04-20 02:38:11','2023-04-20 02:38:11','1681958291005_products_.jpg'),(12,'Taladro Percutor Stanley','13mm 800w','19674',3,10,2,'mandril de 1.5/13mm (con llave)\r\nvelocidad variable reversible de 0 a 2800rpm\r\npeso 2.85 kg\r\nrosca de 1/2 x 20 UNF para diametros de 1.5 a 13mm','2023-05-21 23:18:10','2023-05-25 18:18:17','1684711090842_products_.jpg'),(13,'Taladro percutor lusqtoff','13mm velocidad variable','17898',3,10,2,'portencia 600w\r\nmandril 13mm\r\npeso 2.36kg\r\ngarantia de fabrica 24 meses\r\nreversa\r\n\r\nincluye mango auxiliar con soft grip, llave mandril, 1 juego de carbones','2023-05-21 23:24:29','2023-05-21 23:24:29','1684711469126_products_.jpg'),(14,'Taladro percutor skill','570w 13mm','13152',3,5,2,'mandril 1/2 - 13mm\r\npotencia 570w\r\n2 velocidades\r\nreversa\r\nboton-traba para trabajos continuos\r\nno incluye soporte','2023-05-21 23:30:06','2023-05-25 18:19:09','1684711806197_products_.jpg'),(15,'atornillador inalambrico black + decker','12v 10mm 550rpm','13530',3,5,7,'velocidad 0-550 rpm\r\ntorque maximo 13nm\r\namperaje de bateria 2Ah\r\npotencia 12w\r\npeso 4.00kg\r\nincluye bateria, cargador, punta phillips, maletin plastico','2023-05-21 23:36:57','2023-05-21 23:36:57','1684712217930_products_.jpg'),(16,'atornillador inalambrico deWalt','20v 13mm','77268',6,0,7,'luz led\r\nvoltaje 20V\r\nposiciones de embrague 16\r\nmandril 13mm\r\nbateria 1.3Ah\r\nincluye 2 baterias, cargador','2023-05-21 23:40:22','2023-05-25 17:14:39','1684712422492_products_.jpg'),(17,'atornillador inalambrico bosch','18v 13mm percutor','90882',6,20,7,'tension 18v\r\namperaje 2 Ah\r\nbateria de litio\r\nmandril 1.5 a 13mm','2023-05-21 23:44:26','2023-05-25 16:47:27','1684712666609_products_.jpg'),(18,'Rotomartillo Bosch','850w sds plus','69804',6,10,4,'potencia 850w\r\npeso 2.8kg\r\nlongitud 377mm\r\nancho 83mm\r\naltura 210mm\r\nincluye\r\n1 limitador de profundidad\r\n1 empuñadura adicional\r\n1 maletin','2023-05-25 18:30:39','2023-05-25 18:30:39','1685039439124_products_.jpg'),(19,'Rotomartillo Lusqtoff','1500w 5J','50547',3,5,4,'tension 220v\r\npotencia 1500w\r\nvelocidad 0-800 RPM\r\npotencia de impacto 5 Joules\r\npeso 5.3kg\r\nincluye\r\njuego de carbones\r\ngrasa\r\ncubierta antipolvo\r\n3 brocas \r\n1 cincel plano\r\n1 cincel punta','2023-05-25 18:34:49','2023-05-25 18:34:49','1685039689326_products_.jpg'),(20,'Rotomartillo taladro percutor Stanley','1250w','74034',12,10,4,'potencia 1250w\r\nvelocidad 850rpm\r\ngolpes 4100 gpm/min\r\nenergia de impacto 3.5 Joules\r\navance y reversa\r\nincluye\r\n5 brocas\r\n1 cincel plano\r\n1 cincel punta\r\nempuñadura\r\nmaletin','2023-05-25 18:39:33','2023-05-25 18:39:33','1685039973508_products_.jpg'),(21,'Sierra circular Bosch','2200w 235mm','95364',6,0,3,'potencia 2200w\r\nvelocidad 5300rpm\r\npeso 7.6kg\r\ndiametro de disco 235mm\r\nprofundidad de corte (90°) 65mm\r\nprofundidad de corte (45°) 85mm\r\nincluye \r\n1 disco\r\n1 llave para cambio de disco\r\n1 guia paralela\r\n\r\ngarantia oficial bosch 12 meses','2023-05-25 18:46:40','2023-05-25 18:46:40','1685040400902_products_.jpg'),(22,'Sierra circular black + decker','1400W 184mm','30408',0,0,3,'potencia 1400w\r\nvelocidad 5300/min\r\ndiametro de disco 184mm\r\nprofundidad maxima 62mm\r\nincluye\r\nguia paralela\r\n1 disco de corte 18 dientes\r\n','2023-05-30 01:01:21','2023-05-30 01:01:21','1685408481298_products_.jpg'),(23,'Sierra circular skill','1400w 184mm','33000',3,10,3,'diametro disco 184mm\r\npeso 4.9kg\r\neje 5/8\"\r\npotencia 1400w\r\nrotacion 6000/min\r\nincluye\r\n1 llave fija \r\n1 disco de sierra\r\n1 paralela','2023-05-30 01:04:05','2023-05-30 01:04:05','1685408645084_products_.jpg'),(24,'Cortacerco inalambrico Black & decker','20v','63000',6,15,35,'voltaje 20v\r\nvelocidad 1300 rpm\r\naccion de la hoja: doble\r\npeso con bateria 2.6kg\r\nincluye\r\nbateria de litio de 20v\r\ncargador de 20v','2023-05-30 01:08:40','2023-05-30 01:08:40','1685408920477_products_.jpg'),(25,'Soldadora inverter Lusqtoof','Iron 100','48000',12,10,5,'voltaje 220v\r\nfrecuenca 50hz\r\ntension de carga 65v\r\nincluye\r\n2 escuadras magneticas\r\n1kg de electrodos\r\ncable porta masa y pinza\r\nmascara fotosensible','2023-05-30 01:19:06','2023-05-30 01:19:06','1685409546527_products_.jpg'),(26,'latex  mate interior sherwin william','20lts','50000',10,10,21,'exelente poder cubritivo,\r\nmayor adherencia','2023-06-14 01:15:46','2023-06-14 01:15:46','1686705346528_products_.jpg'),(27,'latex interior blanco tersuave','tersen 20 lts','30000',3,5,21,'latex interior lavable tersen \r\nmejor relacion precio calidad','2023-06-14 01:17:24','2023-06-14 01:17:24','1686705444679_products_.jpg'),(28,'latex acrilico mate recuplast','20 lts','60000',6,10,21,'excelente poder cubritivo\r\n','2023-06-14 01:32:56','2023-06-14 01:32:56','1686706376465_products_.jpg'),(29,'latex interior LOXON sherwin william','20 lts blanco mate','66666',6,0,21,'lo mejor de lo mejor','2023-06-14 01:35:08','2023-06-14 01:35:08','1686706508646_products_.jpg'),(30,'lavable tersuave','20 lts revestimiento estirenado','75000',5,20,21,'la mejor pintura lavable','2023-06-14 01:36:53','2023-06-14 01:36:53','1686706613518_products_.jpg');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_categorias`
--

LOCK TABLES `sub_categorias` WRITE;
/*!40000 ALTER TABLE `sub_categorias` DISABLE KEYS */;
INSERT INTO `sub_categorias` VALUES (1,'Amoladoras',1),(2,'Agujereadoras',1),(3,'Circulares',1),(4,'Rotomartillos',1),(5,'Soldadoras',1),(6,'Compresores',1),(7,'Atornilladoras',1),(8,'Minitornos',1),(9,'Frezadoras',1),(10,'Hidrolavadoras',1),(11,'Martillos',2),(12,'Prensas',2),(13,'Serruchos',2),(14,'Pinzas y Alicates',2),(15,'Llaves y Tubos',2),(16,'Destornilladores',2),(17,'Medicion',2),(18,'Cajas y Set de Herramientas',2),(19,'Carros y Zorras',2),(20,'Linternas',2),(21,'Latex',3),(22,'Sinteticos',3),(23,'Pinceles',3),(24,'Rodillos',3),(25,'Diluyentes',3),(26,'Masillas',3),(27,'Espatulas',2),(28,'Lijadoras',1),(29,'Entonadores',3),(30,'Barniz',3),(31,'Texturados',3),(32,'Piletas',4),(33,'Parrillas',4),(34,'Camping y Playa',4),(35,'Jardineria',4),(55,'Aerosoles',3),(59,'Clavos',8),(60,'Cintas',8),(61,'Tornillos',8),(62,'Mechas',8),(63,'Cinceles',8),(64,'Terminales',8),(65,'Hojas de Sierra',8),(66,'Discos',8),(67,'Presintos',8),(68,'Buloneria',8),(69,'Adhesivos',8),(70,'Accesorios Minitorno',8),(71,'Motosierras',1);
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
  `telefono` varchar(100) NOT NULL,
  `celular` varchar(100) NOT NULL,
  `localidad` varchar(100) NOT NULL,
  `imagen_suc` varchar(100) DEFAULT NULL,
  `provincia` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursales`
--

LOCK TABLES `sucursales` WRITE;
/*!40000 ALTER TABLE `sucursales` DISABLE KEYS */;
INSERT INTO `sucursales` VALUES (1,'Lanus','Juncal','2938','lanus_suc@arknight.com.ar','42202020','1133866202','Lanus','ferreteria.jpg','Buenos Aires'),(2,'CABA','Corrientes','1212','caba_suc@arknight.com.ar','42303030','1122334455','CABA','ferreteria1.jpg','Buenos Aires'),(3,'La Plata','CALLE 11','555','laplata_suc@arknight.com.ar','42404040','1133225544','La Plata','ferreteria2.jpg','Buenos Aires'),(4,'Tucuman','Concepcion','1356','tucuman_suc@arknight.com.ar','3562012523','35615243625','Concepcion','ferreteria3.jpg','Tucuman');
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
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `telefono` varchar(100) DEFAULT NULL,
  `codigo_postal` varchar(100) DEFAULT NULL,
  `localidad` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `rol` int(11) NOT NULL DEFAULT 0,
  `provincia` varchar(100) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (4,'nicolas','rey','prueba1234@mail.com','$2a$12$plI98Ju8HCLtUEHHhDN75ONqqzDdQQcS.iWArZcfKx3OTDRe2LsOa','','','','2023-05-18 00:09:54','2023-05-18 00:09:54',1,'','1684368593175_avatar_.jpeg',''),(5,'tomas','gongora','tomy@gmail.com','$2a$12$CLa5p5cJ21FBN5QYcTiJlOCTNerNyoO1l9oXMHuQc90x/PsiH2eom','1122334455','1844','CONCEPCION','2023-05-21 14:16:14','2023-05-21 14:18:48',1,'90','default-image.png','calle falsa 123'),(6,'franco','urrutia','franco12@gmail.com','$2a$12$6ehOpKadsdmyXgwnp.BPju9iOgTU5KoDlARNZknDfKL5TAc54VZr6','','','','2023-05-21 23:00:30','2023-05-21 23:00:30',1,'','default-image.png',''),(7,'lionel','gegena','lionel.gegena@gmail.com','$2a$12$rSpDo1kk2VkZQwRER0RkXu123Puz/TdkjcHgULZWn/5BZXb0gtsaS','','','','2023-05-30 00:56:46','2023-05-30 00:57:14',1,'','default-image.png','');
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

-- Dump completed on 2023-06-13 22:43:23
