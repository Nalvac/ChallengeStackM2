<?php
namespace App\Command;

use App\Repository\UserRepository;
use App\Repository\ProductRepository;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class SendStockAlertCommand extends Command
{
    protected static $defaultName = 'app:send-stock-alert';

    private $mailer;
    private $userRepository;
    private $productRepository;

    public function __construct(MailerInterface $mailer, UserRepository $userRepository, ProductRepository $productRepository)
    {
        parent::__construct();
        $this->mailer = $mailer;
        $this->userRepository = $userRepository;
        $this->productRepository = $productRepository;
    }

    protected function configure()
    {
        $this->setDescription('Envoi d\'email quand le stock d\'un produit est en manque');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $commercialUsers = $this->userRepository->findByRole('commercial');
        $products = $this->productRepository->findAll();

        foreach ($products as $product) {
            // $stockLimit = $product->getStockAlerte();
            $currentStock = $this->calculateStock($product);
            $stockLimit = 2;
            $currentStock = 1;

            if ($currentStock < $stockLimit) {
                foreach ($commercialUsers as $user) {
                    $email = (new Email())
                        ->from('ccam@gmail.com')
                        ->to($user->getEmail())
                        ->subject('Alerte de Stock')
                        ->text("Attention {$product->getName()} {$product->getBrand()} a atteint un seuil inférieur à {$stockLimit} dans nos stocks.");

                    $this->mailer->send($email);
                }
            }
        }

        $output->writeln('Stock alerts sent successfully.');
        return Command::SUCCESS;
    }
}
