
CREATE TABLE `passproject`.`vehicles` (
  `vehicles_vehicle_id` VARCHAR(30) NOT NULL,
  `vehicles_tag_id` VARCHAR(30) NOT NULL,
  `vehicles_tag_prov` VARCHAR(30) NOT NULL,
  `vehicles_tag_abbr` VARCHAR(10) NOT NULL,
  `vehicles_li_year` INT NOT NULL,
  PRIMARY KEY (`vehicles_vehicle_id`));

CREATE TABLE `passproject`.`stations` (
  `stations_station_id` VARCHAR(5) NOT NULL,
  `stations_station_prov` VARCHAR(30) NOT NULL,
  `stations_station_name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`stations_station_id`));

CREATE TABLE `passproject`.`passes` (
  `passes_pass_id` VARCHAR(30) NOT NULL,
  `passes_timestamp` DATETIME NOT NULL,
  `passes_station_id` VARCHAR(5) NOT NULL,
  `passes_vehicle_id` VARCHAR(30) NOT NULL,
  `passes_charge` DECIMAL(6,3) NOT NULL,
  PRIMARY KEY (`passes_pass_id`),
  INDEX `station_id_idx` (`passes_station_id` ASC) VISIBLE,
  INDEX `vehicle_id_idx` (`passes_vehicle_id` ASC) VISIBLE,
  CONSTRAINT `station_id`
    FOREIGN KEY (`passes_station_id`)
    REFERENCES `passproject`.`stations` (`stations_station_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `vehicle_id`
    FOREIGN KEY (`passes_vehicle_id`)
    REFERENCES `passproject`.`vehicles` (`vehicles_vehicle_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);