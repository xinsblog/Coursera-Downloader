class Downloader:
    def test(self):
        self.attr = 1

    def ptest(self):
        print self.attr

d = Downloader()
d.test()
d.ptest()