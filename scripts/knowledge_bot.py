import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
import re
import datetime
import logging
from typing import List, Dict, Tuple, Optional

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class KnowledgeBot:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.knowledge_base: List[Dict] = []
        self.vectors = None
        
    def load_knowledge_from_txt(self, filepath: str, chunk_size: int = 1000):
        """Load knowledge from a text file, splitting into chunks."""
        try:
            with open(filepath, 'r', encoding='utf-8') as file:
                text = file.read()
                
            # Split text into chunks
            chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
            
            # Add chunks to knowledge base
            for chunk in chunks:
                self.knowledge_base.append({
                    'text': chunk,
                    'source': filepath
                })
            
            logger.debug(f"Loaded {len(chunks)} chunks from {filepath}")    
            self._update_vectors()
            return True
        except Exception as e:
            logger.error(f"Error loading file {filepath}: {str(e)}")
            return False
            
    def load_knowledge_from_json(self, filepath: str):
        """Load QA pairs from a JSON file."""
        try:
            with open(filepath, 'r', encoding='utf-8') as file:
                qa_pairs = json.load(file)
                
            for qa in qa_pairs:
                # Combine question and answer for better matching
                combined_text = f"{qa['question']} {qa['answer']}"
                self.knowledge_base.append({
                    'text': combined_text,
                    'source': filepath,
                    'question': qa['question'],
                    'answer': qa['answer']
                })
            
            logger.debug(f"Loaded {len(qa_pairs)} QA pairs from {filepath}")
            logger.debug(f"First QA pair: {qa_pairs[0] if qa_pairs else 'None'}")
            
            self._update_vectors()
            return True
        except Exception as e:
            logger.error(f"Error loading file {filepath}: {str(e)}")
            return False
    
    def _update_vectors(self):
        """Update TF-IDF vectors for the knowledge base."""
        if not self.knowledge_base:
            logger.warning("Knowledge base is empty during vector update")
            return
            
        texts = [item['text'] for item in self.knowledge_base]
        self.vectors = self.vectorizer.fit_transform(texts)
        logger.debug(f"Updated vectors for {len(texts)} items")
    
    def _preprocess_text(self, text: str) -> str:
        """Clean and normalize input text."""
        text = text.lower()
        text = re.sub(r'[^\w\s?]', '', text)
        return text.strip()
    
    def _find_best_match(self, query: str, threshold: float = 0.1) -> Optional[Dict]:
        """Find the best matching response from the knowledge base."""
        if not self.knowledge_base or self.vectors is None:
            logger.warning("Empty knowledge base or vectors not initialized")
            return None
            
        # Vectorize the query
        query_vector = self.vectorizer.transform([query])
        
        # Calculate similarities
        similarities = cosine_similarity(query_vector, self.vectors)[0]
        
        # Find best match
        best_idx = np.argmax(similarities)
        best_similarity = similarities[best_idx]
        
        logger.debug(f"Best match similarity: {best_similarity} for query: {query}")
        
        if best_similarity >= threshold:
            response = self.knowledge_base[best_idx].copy()
            response['similarity'] = float(best_similarity)
            logger.debug(f"Found match: {response.get('question', 'N/A')}")
            return response
        
        logger.debug(f"No match found above threshold {threshold}")
        return None
    
    def get_response(self, query: str) -> Dict:
        """Get a response for the given query."""
        logger.debug(f"Processing query: {query}")
        query = self._preprocess_text(query)
        match = self._find_best_match(query)
        
        if match:
            # If it's a QA pair, return the answer
            if 'answer' in match:
                return {
                    'text': match['answer'],
                    'confidence': match['similarity'],
                    'source': match['source'],
                    'matched_question': match.get('question', '')
                }
            # If it's a text chunk, return the relevant portion
            return {
                'text': match['text'],
                'confidence': match['similarity'],
                'source': match['source']
            }
            
        return {
            'text': "I'm sorry, I couldn't find a relevant answer to your question.",
            'confidence': 0.0,
            'source': None
        }

    def save_conversation(self, query: str, response: Dict, filepath: str):
        """Save conversation history to a file."""
        try:
            with open(filepath, 'a', encoding='utf-8') as file:
                json.dump({
                    'query': query,
                    'response': response,
                    'timestamp': str(datetime.datetime.now())
                }, file)
                file.write('\n')
        except Exception as e:
            logger.error(f"Error saving conversation: {str(e)}")