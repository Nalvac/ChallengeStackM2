<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240111150946 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE customer_transaction DROP FOREIGN KEY FK_717C2ED9A76ED395');
        $this->addSql('ALTER TABLE customer_transaction ADD CONSTRAINT FK_717C2ED9A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE product_batch DROP FOREIGN KEY FK_595729884584665A');
        $this->addSql('ALTER TABLE product_batch DROP FOREIGN KEY FK_59572988A76ED395');
        $this->addSql('ALTER TABLE product_batch CHANGE product_id product_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE product_batch ADD CONSTRAINT FK_595729884584665A FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE product_batch ADD CONSTRAINT FK_59572988A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE SET NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE customer_transaction DROP FOREIGN KEY FK_717C2ED9A76ED395');
        $this->addSql('ALTER TABLE customer_transaction ADD CONSTRAINT FK_717C2ED9A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE product_batch DROP FOREIGN KEY FK_595729884584665A');
        $this->addSql('ALTER TABLE product_batch DROP FOREIGN KEY FK_59572988A76ED395');
        $this->addSql('ALTER TABLE product_batch CHANGE product_id product_id INT NOT NULL');
        $this->addSql('ALTER TABLE product_batch ADD CONSTRAINT FK_595729884584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE product_batch ADD CONSTRAINT FK_59572988A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }
}
