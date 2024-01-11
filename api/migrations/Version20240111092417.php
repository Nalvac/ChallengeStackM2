<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240111092417 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE customer_transaction (id INT AUTO_INCREMENT NOT NULL, product_batch_id INT NOT NULL, user_id INT NOT NULL, quantity INT NOT NULL, delivery_date DATE NOT NULL, INDEX IDX_717C2ED9382ED4ED (product_batch_id), INDEX IDX_717C2ED9A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE customer_transaction ADD CONSTRAINT FK_717C2ED9382ED4ED FOREIGN KEY (product_batch_id) REFERENCES product_batch (id)');
        $this->addSql('ALTER TABLE customer_transaction ADD CONSTRAINT FK_717C2ED9A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE product ADD vaccin_type VARCHAR(255) NOT NULL');
        $this->addSql('DROP INDEX UNIQ_8D93D6495126AC48 ON user');
        $this->addSql('ALTER TABLE user ADD land VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE customer_transaction DROP FOREIGN KEY FK_717C2ED9382ED4ED');
        $this->addSql('ALTER TABLE customer_transaction DROP FOREIGN KEY FK_717C2ED9A76ED395');
        $this->addSql('DROP TABLE customer_transaction');
        $this->addSql('ALTER TABLE product DROP vaccin_type');
        $this->addSql('ALTER TABLE user DROP land');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D6495126AC48 ON user (mail)');
    }
}
