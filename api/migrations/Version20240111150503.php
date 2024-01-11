<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240111150503 extends AbstractMigration
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
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE customer_transaction DROP FOREIGN KEY FK_717C2ED9A76ED395');
        $this->addSql('ALTER TABLE customer_transaction ADD CONSTRAINT FK_717C2ED9A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }
}
