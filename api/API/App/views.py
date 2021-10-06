from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from App.models import Customers, PaymentDetails
from App.serializers import CustomerSerializer, PaymentSerializer

from django.core.files.storage import default_storage

# Create your views here.

@csrf_exempt
def customerApi(request,id=0):
    if request.method=='GET':
        customer = Customers.objects.get(PhoneNumber=request.GET['phoneNumber'], SetupBoxNumber=request.GET['setupBoxNumber'])
        customer_serializer=CustomerSerializer(customer,many=False)
        return JsonResponse(customer_serializer.data,safe=False)
    elif request.method=='POST':
        payment_data=JSONParser().parse(request)
        payment_serializer=PaymentSerializer(data=payment_data)
        if payment_serializer.is_valid():
            customer=Customers.objects.get(CustomerId=payment_data['CustomerId'])
            customer.LastPaymentDate = payment_data['DateOfPayment']
            customer.save()
            payment_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)