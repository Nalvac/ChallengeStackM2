<?php

namespace App\Controller;

use App\Repository\CustomerTransactionRepository;
use App\Repository\ProductBatchRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class TensionVaccinController extends AbstractController
{
    #[Route('/api/best/vaccin', name: 'get_best_vaccin', methods: ['GET'])]
    public function getBestVaccin(CustomerTransactionRepository $customerTransactionRepository, SerializerInterface $serializer): JsonResponse
    {
      $bestVaccin = $customerTransactionRepository->findBestVaccin();

      $data = $serializer->serialize($bestVaccin, 'json');
      return new JsonResponse($data, 200, [], true);
    }

    #[Route('/api/tension/vaccin', name: 'get_tension_vaccin', methods: ['POST'])]
    public function getTensionVaccin(CustomerTransactionRepository $customerTransactionRepository, SerializerInterface $serializer, Request $request): JsonResponse
    {
      $data = $request->getContent();
      $jsonData = json_decode($data, true);

      $groupedByMonth = array_fill_keys([
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
      ], []);



      $date = $jsonData['deliveryDate'];
      $product = $jsonData['productId'];

      $tensionVaccin = $customerTransactionRepository->findVaccinByQuantityByDate($product, $date);

      foreach ($tensionVaccin as $entry) {
        $deliveryDate = $entry['deliveryDate'];
        $monthIndex = (int)$deliveryDate->format('m') - 1; // -1 car l'indexation des tableaux commence à 0
        $monthNames = array_keys($groupedByMonth);
        $monthName = $monthNames[$monthIndex];

        // Clé unique basée sur l'ID du produit pour le mois.
        $productId = $entry['id'];

        // Vérifiez si le produit existe déjà pour ce mois.
        if (isset($groupedByMonth[$monthName][$productId])) {
          // Si le produit existe, additionnez les quantités.
          $groupedByMonth[$monthName][$productId]['quantite'] += $entry['quantite'];
        } else {
          // Si le produit n'existe pas, ajoutez-le avec la quantité actuelle.
          $groupedByMonth[$monthName][$productId] = [
            'id' => $productId,
            'quantite' => intval($entry['quantite']),
            'name' => $entry['name'],
            'brand' => $entry['brand']
          ];

          foreach ($groupedByMonth as $month => $product)
          {
            if(!isset($groupedByMonth[$month][$productId]))
            {
              $groupedByMonth[$month][$productId] = [
                'id' => $productId,
                'quantite' => 0,
                'name' => $entry['name'],
                'brand' => $entry['brand']
              ];
            }
          }
        }
      }

      $res = $serializer->serialize($groupedByMonth, 'json');

      return new JsonResponse($res, 200, [], true);
    }

    #[Route('/api/localisation/vaccin', name: 'get_localisation_vaccin', methods: ['POST'])]
    public function getLocalisationVaccin(CustomerTransactionRepository $customerTransactionRepository, SerializerInterface $serializer, Request $request): JsonResponse
    {
      $data = $request->getContent();
      $jsonData = json_decode($data, true);

      $product = $jsonData['productIds'];
      $city = $jsonData['city'];

      $localisationVaccin = $customerTransactionRepository->findVaccinByQuantityByLocalisation($product, $city);

      $res = $serializer->serialize($localisationVaccin, 'json');

      return new JsonResponse($res, 200, [], true);
    }

    #[Route('/api/localisation/best/vaccin', name: 'get_localisation_best_vaccin', methods: ['POST'])]
    public function getBestVaccinByLocalisation(CustomerTransactionRepository $customerTransactionRepository, SerializerInterface $serializer, Request $request): JsonResponse
    {
      $data = $request->getContent();
      $jsonData = json_decode($data, true);

      $city = $jsonData['city'];

      $localisationBestVaccin = $customerTransactionRepository->findBestVaccinByLocalisation($city);

      $res = $serializer->serialize($localisationBestVaccin, 'json');

      return new JsonResponse($res, 200, [], true);
    }

    #[Route('/api/localisation/best/supplier', name: 'get_localisation_best_supplier', methods: ['POST'])]
    public function getBestSupplierByLocalisation(ProductBatchRepository $productBatchRepository, SerializerInterface $serializer, Request $request): JsonResponse
    {
      $data = $request->getContent();
      $jsonData = json_decode($data, true);

      $city = $jsonData['city'];

      $localisationBestSupplier = $productBatchRepository->findBestSupplier($city);

      $res = $serializer->serialize($localisationBestSupplier, 'json');

      return new JsonResponse($res, 200, [], true);
    }

}
