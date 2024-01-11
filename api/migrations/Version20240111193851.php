<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240111193851 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE product (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, brand VARCHAR(255) NOT NULL, stock_alert INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE role (id INT AUTO_INCREMENT NOT NULL, role VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_57698A6A57698A6A (role), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, roles_id INT NOT NULL, name VARCHAR(255) NOT NULL, mail VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, zip_code INT NOT NULL, city VARCHAR(255) NOT NULL, adress VARCHAR(255) NOT NULL, password VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D6495126AC48 (mail), INDEX IDX_8D93D64938C751C4 (roles_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64938C751C4 FOREIGN KEY (roles_id) REFERENCES role (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64938C751C4');
        $this->addSql('DROP TABLE product');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE user');
    }
}
