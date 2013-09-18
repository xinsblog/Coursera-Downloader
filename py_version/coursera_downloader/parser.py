import re
import ConfigParser

class Parser:
    def __init__(self, filepath, confpath):
        self.webpage = self.readCoursepage(filepath)
        self.readConf(confpath)

    def readCoursepage(self, filepath):
        fd = open(filepath, "r")
        webpage = fd.read()
        fd.close()
        return webpage

    def readConf(self, confpath):
        conf = ConfigParser.ConfigParser()
        conf.read(confpath)
        self.item_list_pattern = re.compile(conf.get('patterns', 'item_list_pattern'), re.DOTALL)
        self.list_header_pattern = re.compile(conf.get('patterns', 'list_header_pattern'), re.DOTALL)
        self.list_items_pattern = re.compile(conf.get('patterns', 'list_items_pattern'), re.DOTALL)
        self.item_name_pattern = re.compile(conf.get('patterns', 'item_name_pattern'), re.DOTALL)
        self.item_resource_pattern = re.compile(conf.get('patterns', 'item_resource_pattern'), re.DOTALL)
        self.slide_keyword = conf.get('resources', 'slides').split(',')
        self.subtitle_keyword = conf.get('resources', 'subtitles').split(',')
        self.video_keyword = conf.get('resources', 'videos').split(',')

    def __findALLList(self):
        return self.item_list_pattern.findall(self.webpage)

    def __findListHeader(self, item_list):
        header = self.list_header_pattern.findall(item_list)
        return header[0]

    def __findListItems(self, item_list):
        return self.list_items_pattern.findall(item_list)

    def __findItemName(self, item):
        item_name = self.item_name_pattern.findall(item)
        return item_name[0]

    def __findItemResources(self, item):
        return self.item_resource_pattern.findall(item)

    def __fetchSlides(self, resources):
        pdfs = [resource for resource in resources if "pdf" in resource]
        ppts = [resource for resource in resources if "ppt" in resource]
        return pdfs + ppts

    def __fetchVideos(self, resources):
        return [resource for resource in resources if "mp4" in resource]

    def __fetchSubtitiles(self, resources):
        return [resource for resource in resources if "srt" in resource]

    __defaultFunc = lambda x : None

    def __iterateResources(self, preFunc, resourceFunc, headerFunc=__defaultFunc, itemFunc=__defaultFunc):
        preFunc()
        item_lists = self.__findALLList()
        for item_list in item_lists:
            list_header = self.__findListHeader(item_list)
            headerFunc(list_header)
            items = self.__findListItems(item_list)
            for item in items:
                itemFunc(item)
                resources = self.__findItemResources(item)
                resourceFunc(resources)

    def printAll(self):
        def preFunc():
            print "All resources:"
        def headerFunc(list_header):
            print list_header
        def itemFunc(item):
            print self.__findItemName(item)
        def resourceFunc(resources):
            slides = self.__fetchSlides(resources)
            print 'Slides:'
            for slide in slides:
                print slide
            videos = self.__fetchVideos(resources)
            print 'Videos:'
            for video in videos:
                print video
            subtitles = self.__fetchSubtitiles(resources)
            print 'Subtitles:'
            for subtitle in subtitles:
                print subtitle
        self.__iterateResources(preFunc=preFunc, resourceFunc=resourceFunc, itemFunc=itemFunc, headerFunc=headerFunc)

    def printAllSlides(self):
        def preFunc():
            print "All slides:"
        def resourceFunc(resources):
            slides = self.__fetchSlides(resources)
            for slide in slides:
                print slide
        self.__iterateResources(preFunc=preFunc, resourceFunc=resourceFunc)

    def printAllVideos(self):
        def preFunc():
            print 'All videos'
        def resourceFunc(resources):
            videos = self.__fetchVideos(resources)
            for video in videos:
                print video
            subtitles = self.__fetchSubtitiles(resources)
        self.__iterateResources(preFunc=preFunc, resourceFunc=resourceFunc)

    def printAllSubtitles(self):
        def preFunc():
            print 'All subtitles:'
        def resourceFunc(resources):
            subtitles = self.__fetchSubtitiles(resources)
            for subtitle in subtitles:
                print subtitle
        self.__iterateResources(preFunc=preFunc, resourceFunc=resourceFunc)


if __name__ == '__main__':
    parser = Parser('course_page/RS.htm', 'parser.conf')
    # parser.printAll()
    parser.printAllSlides()
    parser.printAllVideos()
    parser.printAllSubtitles()
