<?php

namespace App\Controller;

use App\Repository\CustomerTransactionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CommandController extends AbstractController
{
    #[Route('/api/command/{id}', name: 'app_command_officine', methods: ['GET'])]
    public function getCommandeOfficine(CustomerTransactionRepository $customerTransactionRepository, SerializerInterface $serializer, $id): JsonResponse
    {
      $officine = $customerTransactionRepository->getCommandByOfficineId($id);

      $groupedByDeliveryDate = [];

      foreach ($officine as $result) {
        $deliveryDate = $result['deliveryDate']->format('Y-m-d'); // Format the DateTime object to string

        // Initialize the sub-array if it does not exist
        if (!isset($groupedByDeliveryDate[$deliveryDate])) {
          $groupedByDeliveryDate[$deliveryDate] = [];
        }

        // Append product details to the sub-array for the delivery date
        $groupedByDeliveryDate[$deliveryDate][] = [
          'productName' => $result['product_name'],
          'brandName' => $result['brand'],
          'stock' => $result['quantity']
        ];
      }

      $data = $serializer->serialize($groupedByDeliveryDate, 'json');

      return new JsonResponse($data, 200, [], true);
    }
}
