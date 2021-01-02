from pytrends.request import TrendReq
from django.apps import AppConfig

pytrends = TrendReq(hl='en-US', timeout=(10,25))

class GetTrends(AppConfig):
    '''get trends using pytrends'''
    def relative_comparison(data):
        '''get trends for a group of keywords'''
        time_frame = 'today 3-m'
        geo = ''
        cat = '0'
        gprop = ''
        pytrends.build_payload(data,
                               cat,
                               time_frame,
                               geo,
                               gprop)
        results = pytrends.interest_over_time()
        mean = results.mean()


        return results, mean



