import streamlit as st
import pandas as pd
import requests
from bs4 import BeautifulSoup
from sentence_transformers import SentenceTransformer, util

# Load pre-trained AI model for semantic similarity
model = SentenceTransformer("paraphrase-MiniLM-L6-v2")

def extract_blog_content(url):
    """Extracts text content from a given blog URL."""
    try:
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}
        response = requests.get(url, timeout=10, headers=headers)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, "html.parser")
            text = soup.get_text(separator=" ")
            return text
        else:
            return None
    except requests.exceptions.RequestException:
        return None

def find_best_matches(content_text, keyword, threshold=0.5):
    """Finds best matching sentences for the keyword with similarity scores."""
    content_sentences = content_text.split(". ")
    matches = []
    
    for sentence in content_sentences:
        similarity = util.pytorch_cos_sim(
            model.encode(sentence, convert_to_tensor=True),
            model.encode(keyword, convert_to_tensor=True)
        ).item()
        
        if similarity >= threshold:
            matches.append({
                "Content": sentence,
                "Anchor Text": f"{keyword} ({round(similarity * 100, 2)}%)"
            })
    
    return sorted(matches, key=lambda x: x["Anchor Text"], reverse=True)

st.title("Blog Content Analyzer")
st.markdown("Developed by [Amal Alexander](https://in.linkedin.com/in/amal-alexander-305780131) ❤️")

uploaded_file = st.file_uploader("Upload a CSV file with blog URLs", type=["csv"])

if uploaded_file:
    df = pd.read_csv(uploaded_file)
    if "URL" in df.columns:
        blog_urls = df["URL"].tolist()
        selected_url = st.selectbox("Select a blog URL to analyze", blog_urls)
        keyword = st.text_input("Enter a keyword to search for in the blog content")
        
        if st.button("Analyze"):
            content_text = extract_blog_content(selected_url)
            if content_text:
                matches = find_best_matches(content_text, keyword)
                
                # Display results in tabular format
                if matches:
                    st.write("### Matching Sentences")
                    results_df = pd.DataFrame(matches)
                    st.table(results_df)
                else:
                    st.write("No matching sentences found.")
            else:
                st.error("Failed to extract content from the URL.")