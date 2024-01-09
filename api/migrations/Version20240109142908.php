<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240109142908 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE product_batch (id INT AUTO_INCREMENT NOT NULL, product_id INT NOT NULL, user_id INT DEFAULT NULL, date_exp DATE NOT NULL, quantity INT NOT NULL, INDEX IDX_595729884584665A (product_id), INDEX IDX_59572988A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE users (id INT AUTO_INCREMENT NOT NULL, roles_id INT NOT NULL, name VARCHAR(255) NOT NULL, mail VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, zip_code INT NOT NULL, city VARCHAR(255) NOT NULL, adress VARCHAR(255) NOT NULL, password VARCHAR(255) DEFAULT NULL, INDEX IDX_1483A5E938C751C4 (roles_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE product_batch ADD CONSTRAINT FK_595729884584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE product_batch ADD CONSTRAINT FK_59572988A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE users ADD CONSTRAINT FK_1483A5E938C751C4 FOREIGN KEY (roles_id) REFERENCES role (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product_batch DROP FOREIGN KEY FK_595729884584665A');
        $this->addSql('ALTER TABLE product_batch DROP FOREIGN KEY FK_59572988A76ED395');
        $this->addSql('ALTER TABLE users DROP FOREIGN KEY FK_1483A5E938C751C4');
        $this->addSql('DROP TABLE product_batch');
        $this->addSql('DROP TABLE users');
    }
}
