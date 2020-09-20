import nltk
nltk.downloader.download('vader_lexicon')
nltk.download('punkt')

from textblob import TextBlob

def subjectivity(params):
    testimonial = TextBlob("Textblob is amazingly simple to use. What great fun!")
    print(testimonial.sentiment.subjectivity)
    return {"subjectivity": testimonial.sentiment.subjectivity}