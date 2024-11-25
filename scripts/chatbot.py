# scripts/chatbot.py
import argparse
import json
import sys
import os
import logging
from knowledge_bot import KnowledgeBot

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def main():
    try:
        # Parse command line arguments
        parser = argparse.ArgumentParser()
        parser.add_argument('--message', required=True, help='Input message to process')
        parser.add_argument('--data-dir', required=True, help='Path to data directory')
        args = parser.parse_args()
        
        logger.debug(f"Received message: {args.message}")
        logger.debug(f"Data directory: {args.data_dir}")

        # Initialize bot
        bot = KnowledgeBot()
        
        # Load knowledge base
        qa_path = os.path.join(args.data_dir, 'qa_pairs.json')
        additional_knowledge_path = os.path.join(args.data_dir, 'additional_knowledge.txt')
        
        logger.debug(f"QA pairs path: {qa_path}")
        
        if not os.path.exists(qa_path):
            raise FileNotFoundError(f"QA pairs file not found at: {qa_path}")
            
        bot.load_knowledge_from_json(qa_path)
        
        if os.path.exists(additional_knowledge_path):
            bot.load_knowledge_from_txt(additional_knowledge_path)
        
        # Get response
        response = bot.get_response(args.message)
        
        # Print JSON response
        print(json.dumps(response))
        
    except Exception as e:
        logger.error(f"Error occurred: {str(e)}", exc_info=True)
        error_response = {
            'error': str(e),
            'text': "I'm sorry, I encountered an error while processing your request.",
            'confidence': 0.0,
            'source': None
        }
        print(json.dumps(error_response))
        sys.exit(1)

if __name__ == "__main__":
    main()