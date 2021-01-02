from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from .apps import GetTrends
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class showTrends(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        data = request.data
        print(data)
        keys = []
        values = []
        for key in data:
            keys.append(key)
            values.append(data[key])
        print(values)
        y = GetTrends.relative_comparison(values)
        response_dict = y[1][0:4]
        print(response_dict)
        return Response(response_dict, status=200)
