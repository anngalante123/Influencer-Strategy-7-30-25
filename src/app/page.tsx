'use client'; 
import React, { useState, useEffect } from 'react';
import { ChevronRight, Target, Users, DollarSign, Calendar, Camera, Mail, Building, Instagram, Twitter, Facebook, Youtube, Linkedin, Hash } from 'lucide-react';

const InfluencerBriefGenerator = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [briefGenerated, setBriefGenerated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [brief, setBrief] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [utmParams, setUtmParams] = useState({});

  // Capture UTM parameters on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmData = {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || '',
      // Also capture referrer and landing page
      referrer: document.referrer || '',
      landing_page: window.location.href || ''
    };
    setUtmParams(utmData);
    console.log('📊 UTM Parameters captured:', utmData);
  }, []);

  const questions = [
    {
      id: 'businessName',
      text: "What's your business name?",
      type: 'input',
      placeholder: "Enter your business name"
    },
    {
      id: 'industry',
      text: "What industry are you in? (Select your primary industry)",
      type: 'single',
      options: [
        { value: 'restaurant', text: 'Restaurant/Food & Beverage', icon: '🍕' },
        { value: 'retail', text: 'Retail/E-commerce', icon: '🛍️' },
        { value: 'beauty', text: 'Beauty/Wellness/Spa', icon: '💄' },
        { value: 'fitness', text: 'Fitness/Health/Gym', icon: '💪' },
        { value: 'tech', text: 'Tech/Software/SaaS', icon: '💻' },
        { value: 'service', text: 'Professional Services', icon: '🏢' },
        { value: 'tourism', text: 'Tourism/Hospitality/Travel', icon: '🏨' },
        { value: 'events', text: 'Events/Entertainment', icon: '🎉' },
        { value: 'healthcare', text: 'Healthcare/Medical', icon: '🏥' },
        { value: 'education', text: 'Education/Training', icon: '📚' },
        { value: 'realestate', text: 'Real Estate', icon: '🏠' },
        { value: 'automotive', text: 'Automotive', icon: '🚗' }
      ]
    },
    {
      id: 'businessHighlights',
      text: "What are the 3–5 key things you want people to know about your business—things that would make customers excited to visit, buy, or try you out?",
      type: 'textarea',
      placeholder: "Tell us about your signature items, specialties, what makes you unique, your atmosphere, etc. (e.g., 'We serve authentic Thai food with fresh ingredients, known for our Pad Thai and Tom Yum soup, family-owned restaurant with a cozy atmosphere')"
    },
    {
      id: 'campaignGoal',
      text: "What do you want this campaign to achieve? (Pick all that apply)",
      type: 'multiple',
      options: [
        { value: 'awareness', text: 'Get more people to know us (Brand Awareness)', icon: '📣' },
        { value: 'sales', text: 'Sell more products/services (Drive Sales)', icon: '💰' },
        { value: 'engagement', text: 'Get more likes & comments (Social Engagement)', icon: '❤️' },
        { value: 'launch', text: 'Launch something new (Product Launch)', icon: '🚀' },
        { value: 'traffic', text: 'Bring more people to our website (Website Traffic)', icon: '🌐' },
        { value: 'community', text: 'Build local loyalty & repeat customers (Build Community)', icon: '👥' }
      ]
    },
    {
      id: 'targetAudience',
      text: "Who is your target audience? (Select all that apply)",
      type: 'multiple',
      options: [
        { value: 'gen-z', text: 'Gen Z (18-26)', icon: '🎮' },
        { value: 'millennials', text: 'Millennials (27-42)', icon: '📱' },
        { value: 'gen-x', text: 'Gen X (43-58)', icon: '🏠' },
        { value: 'parents', text: 'Parents/Families', icon: '👨‍👩‍👧‍👦' },
        { value: 'professionals', text: 'Working Professionals', icon: '💼' },
        { value: 'seniors', text: 'Seniors (55+)', icon: '👴' }
      ]
    },
    {
      id: 'creatorTypes',
      text: "Who do you want posting about your business?",
      subtitle: "Based on what you shared about your business, here are some great creator types for you to consider:",
      type: 'creator-recommendation',
      customField: true
    },
    {
      id: 'budget',
      text: "What payment will you need to budget for creators?",
      type: 'single',
      subtitle: "These are typical costs for one-off creator partnerships. For ongoing campaigns, monthly packages are often more cost-effective.",
      link: "https://www.run-relay.com/start2",
      linkText: "See monthly pricing →",
      options: [
        { value: 'micro', text: '$200 - $500 per month', icon: '💵' },
        { value: 'small', text: '$500 - $1,500 per month', icon: '💶' },
        { value: 'medium', text: '$1,500 - $4,000 per month', icon: '💷' },
        { value: 'large', text: '$4,000 - $10,000 per month', icon: '💴' },
        { value: 'enterprise', text: '$10,000+ per month', icon: '💸' },
        { value: 'custom', text: 'Other amount (specify below)', icon: '✏️' },
        { value: 'none', text: 'No budget available', icon: '🚫' }
      ]
    },
    {
      id: 'platforms',
      text: "Which platforms do you want to focus on? (Select all that apply)",
      type: 'multiple',
      options: [
        { value: 'instagram', text: 'Instagram', icon: '📸' },
        { value: 'tiktok', text: 'TikTok', icon: '🎵' },
        { value: 'youtube', text: 'YouTube', icon: '📺' },
        { value: 'twitter', text: 'Twitter/X', icon: '🐦' },
        { value: 'linkedin', text: 'LinkedIn', icon: '💼' },
        { value: 'facebook', text: 'Facebook', icon: '👥' }
      ]
    },
    {
      id: 'socialHandles',
      text: "What are your social media handles?",
      type: 'handles',
      platforms: ['instagram', 'tiktok', 'youtube', 'twitter', 'linkedin', 'facebook']
    },
    {
      id: 'contentType',
      text: "What type of content do you prefer? (Select all that apply)",
      type: 'multiple',
      options: [
        { value: 'posts', text: 'Feed Posts', icon: '📱' },
        { value: 'stories', text: 'Stories', icon: '📹' },
        { value: 'reels', text: 'Reels/Short Videos', icon: '🎬' },
        { value: 'unboxing', text: 'Unboxing/Reviews', icon: '📦' },
        { value: 'tutorials', text: 'Tutorials/How-tos', icon: '🎓' },
        { value: 'lifestyle', text: 'Lifestyle Integration', icon: '🌟' }
      ]
    },
    {
      id: 'timeline',
      text: "What's your campaign timeline?",
      type: 'single',
      options: [
        { value: 'urgent', text: '1-2 weeks', icon: '⚡' },
        { value: 'standard', text: '3-4 weeks', icon: '📅' },
        { value: 'extended', text: '1-2 months', icon: '🗓️' },
        { value: 'ongoing', text: 'Ongoing partnership', icon: '🔄' }
      ]
    }
  ];

  const getCreatorRecommendations = (industry, businessData) => {
    const recommendations = {
      restaurant: ['Foodies & Restaurant Reviewers', 'Local Lifestyle Creators', 'Food Bloggers & Influencers'],
      beauty: ['Beauty & Skincare Creators', 'Self-Care & Wellness Influencers', 'Local Lifestyle Creators'],
      fitness: ['Fitness & Health Creators', 'Local Lifestyle Creators', 'Wellness & Nutrition Influencers'],
      retail: ['Fashion & Style Creators', 'Local Lifestyle Creators', 'Shopping & Deal Hunters'],
      service: ['Business & Professional Creators', 'Local Lifestyle Creators', 'Industry Experts'],
      tech: ['Tech & Software Reviewers', 'Business & Professional Creators', 'Industry Thought Leaders'],
      tourism: ['Travel & Tourism Creators', 'Local Adventure Creators', 'Lifestyle & Experience Influencers'],
      events: ['Event & Entertainment Creators', 'Local Lifestyle Creators', 'Party & Celebration Influencers'],
      healthcare: ['Health & Wellness Creators', 'Local Lifestyle Creators', 'Medical & Healthcare Professionals'],
      education: ['Education & Learning Creators', 'Local Lifestyle Creators', 'Professional Development Influencers'],
      realestate: ['Real Estate & Home Creators', 'Local Lifestyle Creators', 'Home Design & Living Influencers'],
      automotive: ['Car & Auto Creators', 'Local Lifestyle Creators', 'Auto Review & Enthusiast Influencers']
    };
    
    let baseRecs = recommendations[industry] || recommendations.restaurant;
    
    // Customize based on business highlights
    if (businessData && businessData.keyWords) {
      if (businessData.keyWords.some(word => word.toLowerCase().includes('family'))) {
        baseRecs = baseRecs.map(rec => rec === 'Local Lifestyle Creators' ? 'Family & Parenting Creators' : rec);
      }
      if (businessData.keyWords.some(word => word.toLowerCase().includes('luxury') || word.toLowerCase().includes('premium'))) {
        baseRecs = [...baseRecs.slice(0, 2), 'Luxury & Premium Lifestyle Creators'];
      }
    }
    
    return baseRecs.slice(0, 3);
  };

  const analyzeBusinessHighlights = (highlights) => {
    if (!highlights) return null;

    const text = highlights.toLowerCase();
    
    // Extract menu items/services
    const itemPatterns = [
      /(?:famous for|known for|signature|specialt(?:y|ies)|serve|offer|feature)[\s\w]*?([A-Z][a-z\s&]+?)(?:[,\.]|and)/gi,
      /([A-Z][a-z]+\s+[A-Z][a-z]+)(?:\s+(?:dish|item|specialty|sauce|soup|curry|noodles))?/g
    ];
    
    const items = new Set();
    itemPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(highlights)) !== null) {
        const item = match[1].trim();
        if (item.length > 3 && item.length < 50 && !item.includes('we') && !item.includes('our')) {
          items.add(item);
        }
      }
    });

    // Detect cuisine type
    const cuisineKeywords = {
      'thai': ['thai', 'pad thai', 'tom yum', 'curry', 'pad see ew', 'som tam'],
      'italian': ['italian', 'pasta', 'pizza', 'risotto', 'marinara'],
      'mexican': ['mexican', 'tacos', 'burrito', 'quesadilla'],
      'chinese': ['chinese', 'lo mein', 'fried rice', 'dim sum'],
      'japanese': ['japanese', 'sushi', 'ramen', 'tempura'],
      'indian': ['indian', 'curry', 'tandoori', 'biryani', 'naan'],
      'american': ['american', 'burger', 'sandwich', 'bbq', 'wings']
    };

    let cuisineType = 'restaurant';
    for (const [cuisine, keywords] of Object.entries(cuisineKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        cuisineType = cuisine;
        break;
      }
    }

    // Extract keywords
    const keywords = [];
    const keywordPattern = /\b(authentic|fresh|local|homemade|traditional|organic|family-owned|artisan|handmade|premium|quality|cozy|casual|upscale|modern)\b/gi;
    const matches = text.match(keywordPattern) || [];
    keywords.push(...matches);

    // Determine brand voice
    let brandVoice = 'welcoming, quality-focused';
    if (text.includes('family') && text.includes('traditional')) {
      brandVoice = 'family-oriented, traditional, warm';
    } else if (text.includes('authentic') && text.includes('fresh')) {
      brandVoice = 'authentic, quality-focused, fresh';
    } else if (text.includes('modern') || text.includes('upscale')) {
      brandVoice = 'modern, sophisticated, premium';
    } else if (text.includes('cozy') || text.includes('casual')) {
      brandVoice = 'casual, welcoming, comfortable';
    }

    return {
      popularItems: Array.from(items).slice(0, 6),
      cuisineType,
      keyWords: [...new Set(keywords)].slice(0, 6),
      brandVoice,
      rawHighlights: highlights
    };
  };

  const submitToHubSpot = async (email) => {
    try {
      console.log('📧 Collecting email and form data:', email);
      
      // Comprehensive data collection
      const formData = {
        submissionId: `submission_${Date.now()}`,
        timestamp: new Date().toISOString(),
        email: email,
        businessName: answers.businessName || '',
        industry: answers.industry || '',
        businessHighlights: answers.businessHighlights || '',
        campaignGoals: Array.isArray(answers.campaignGoal) ? answers.campaignGoal.join('; ') : (answers.campaignGoal || ''),
        targetAudience: Array.isArray(answers.targetAudience) ? answers.targetAudience.join('; ') : (answers.targetAudience || ''),
        creatorTypes: Array.isArray(answers.creatorTypes) ? answers.creatorTypes.join('; ') : (answers.creatorTypes || ''),
        customCreatorTypes: answers.customCreatorTypes || '',
        budget: answers.budget || '',
        customBudget: answers.customBudget || '',
        platforms: Array.isArray(answers.platforms) ? answers.platforms.join('; ') : (answers.platforms || ''),
        socialHandles: JSON.stringify(answers.socialHandles || {}),
        contentTypes: Array.isArray(answers.contentType) ? answers.contentType.join('; ') : (answers.contentType || ''),
        timeline: answers.timeline || '',
        leadSourceDetail: 'Influencer Strategy Generator',
        // UTM Parameters
        utmSource: utmParams.utm_source || '',
        utmMedium: utmParams.utm_medium || '',
        utmCampaign: utmParams.utm_campaign || '',
        utmContent: utmParams.utm_content || '',
        utmTerm: utmParams.utm_term || '',
        referrer: utmParams.referrer || '',
        landingPage: utmParams.landing_page || ''
      };
      
      const sendViaWebhook = async () => {
        try {
          // Your Zapier webhook URL is now configured!
          const webhookUrl = 'https://hooks.zapier.com/hooks/catch/18069374/uuvklfc/';
          
          console.log('🎯 Attempting to send to Zapier webhook:', webhookUrl);
          console.log('📦 Payload:', JSON.stringify(formData, null, 2));
          
          const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(formData)
          });
          
          console.log('📤 Data sent to Zapier:', formData);
          console.log('📥 Response status:', response.status);
          console.log('📥 Response ok:', response.ok);
          
          if (response.ok) {
            console.log('✅ Data sent successfully to Zapier webhook!');
            console.log('📧 Check your Zapier dashboard and HubSpot for the data');
            return true;
          } else {
            console.error('❌ Webhook failed with status:', response.status);
            const responseText = await response.text();
            console.error('❌ Response text:', responseText);
            return false;
          }
        } catch (error) {
          console.log('⚠️ Zapier webhook blocked by CSP (Content Security Policy):', error.message);
          console.log('💡 Solution: Copy this form to your own domain where Zapier webhooks will work');
          return false;
        }
      };
      
      // Try methods in order (CSP-safe first)
      console.log('🚀 Sending data invisibly...');
      
      let success = false;
      
      // Try Zapier webhook (blocked by CSP in Claude environment)
      success = await sendViaWebhook();
      if (success) return true;
      
      // Fallback: Log to console (this works in any environment)
      console.log('⚠️ External webhooks blocked by Content Security Policy, logging to console:');
      console.log('='.repeat(80));
      console.log('🎯 NEW FORM SUBMISSION');
      console.log('='.repeat(80));
      console.log('📧 Email:', formData.email);
      console.log('🏢 Business:', formData.businessName);
      console.log('🏭 Industry:', formData.industry);
      console.log('💰 Budget:', formData.budget === 'custom' ? `Custom: ${formData.customBudget}` : formData.budget);
      console.log('🎯 Goals:', formData.campaignGoals);
      console.log('👥 Audience:', formData.targetAudience);
      console.log('✨ Highlights:', formData.businessHighlights);
      console.log('📱 Platforms:', formData.platforms);
      console.log('🎭 Creator Types:', formData.creatorTypes);
      console.log('⏱️ Timeline:', formData.timeline);
      console.log('📊 UTM Source:', formData.utmSource);
      console.log('📊 UTM Campaign:', formData.utmCampaign);
      console.log('📊 Referrer:', formData.referrer);
      console.log('📄 Landing Page:', formData.landingPage);
      console.log('='.repeat(80));
      console.log('💡 NEXT STEPS:');
      console.log('1. Copy this form code to your own website domain');
      console.log('2. The Zapier webhook will work perfectly there');
      console.log('3. Or set up Google Forms integration (see instructions)');
      console.log('='.repeat(80));
      
      return true;
      
    } catch (error) {
      console.error('❌ Error processing submission:', error);
      return false;
    }
  };

  const generateBrief = async () => {
    const businessData = analyzeBusinessHighlights(answers.businessHighlights);

    return {
      businessName: answers.businessName || 'Your Business',
      businessHighlights: answers.businessHighlights || '',
      industry: answers.industry,
      goal: answers.campaignGoal,
      audience: answers.targetAudience,
      platforms: answers.platforms || [],
      socialHandles: answers.socialHandles || {},
      contentTypes: answers.contentType || [],
      timeline: answers.timeline,
      businessData: businessData
    };
  };

  const handleAnswer = (questionId, value, isMultiple = false) => {
    setIsAnimating(true);
    
    let newAnswers = { ...answers };
    
    if (isMultiple) {
      if (!newAnswers[questionId]) newAnswers[questionId] = [];
      
      if (newAnswers[questionId].includes(value)) {
        newAnswers[questionId] = newAnswers[questionId].filter(v => v !== value);
      } else {
        newAnswers[questionId] = [...newAnswers[questionId], value];
      }
      
      setAnswers(newAnswers);
      setIsAnimating(false);
      return;
    } else {
      newAnswers[questionId] = value;
      setAnswers(newAnswers);
    }

    setTimeout(() => {
      // Special handling for no budget selection
      if (questionId === 'budget' && value === 'none') {
        setCurrentScreen('no-budget');
      }
      // Special handling for custom budget - don't advance until they fill it out
      else if (questionId === 'budget' && value === 'custom') {
        // Stay on the same page, just update the answers to show the input field
        setIsAnimating(false);
        return;
      }
      else if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentScreen('email');
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleInputChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleHandlesChange = (platform, handle) => {
    setAnswers(prev => ({
      ...prev,
      socialHandles: {
        ...prev.socialHandles,
        [platform]: handle
      }
    }));
  };

  const nextQuestion = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentScreen('email');
      }
      setIsAnimating(false);
    }, 300);
  };

  const handleEmailSubmit = async () => {
    if (!userEmail.trim()) return;
    
    // 🎉 TRIGGER CONFETTI IMMEDIATELY
    setShowConfetti(true);
    
    setIsAnimating(true);
    
    // Submit email to HubSpot
    const hubspotSuccess = await submitToHubSpot(userEmail);
    
    // Generate the brief (with a bit of delay for the celebration effect)
    const briefData = await generateBrief();
    setBrief(briefData);
    
    setTimeout(() => {
      setEmailSubmitted(true);
      setBriefGenerated(true);
      setCurrentScreen('result');
      setIsAnimating(false);
      
      // Keep confetti going longer on the results page for more celebration
      setTimeout(() => setShowConfetti(false), 11000);
    }, 1500); // Slightly longer to enjoy the confetti
  };

  const goBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (currentScreen === 'questions' && currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      } else if (currentScreen === 'email') {
        setCurrentScreen('questions');
        setCurrentQuestion(questions.length - 1);
      } else if (currentScreen === 'no-budget') {
        setCurrentScreen('questions');
        // Go back to budget question
        const budgetQuestionIndex = questions.findIndex(q => q.id === 'budget');
        setCurrentQuestion(budgetQuestionIndex);
      } else if (currentScreen === 'questions' && currentQuestion === 0) {
        setCurrentScreen('welcome');
      }
      setIsAnimating(false);
    }, 300);
  };

  const restart = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentScreen('welcome');
      setCurrentQuestion(0);
      setAnswers({});
      setUserEmail('');
      setEmailSubmitted(false);
      setBriefGenerated(false);
      setBrief(null);
      setShowConfetti(false); // Reset confetti
      setIsAnimating(false);
    }, 300);
  };

  const startGenerator = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentScreen('questions');
      setIsAnimating(false);
    }, 300);
  };

  const getSocialIcon = (platform) => {
    const icons = {
      instagram: <Instagram className="w-5 h-5" />,
      tiktok: <Hash className="w-5 h-5" />,
      youtube: <Youtube className="w-5 h-5" />,
      twitter: <Twitter className="w-5 h-5" />,
      linkedin: <Linkedin className="w-5 h-5" />,
      facebook: <Facebook className="w-5 h-5" />
    };
    return icons[platform] || <Hash className="w-5 h-5" />;
  };

  const ConfettiEffect = () => {
    if (!showConfetti) return null;
    
    const confettiColors = ['#AB35EE', '#ffffff', '#9333ea', '#e879f9', '#fbbf24', '#f59e0b'];
    const confettiPieces = Array.from({ length: 50 }, (_, i) => (
      <div
        key={i}
        className="confetti-piece"
        style={{
          '--delay': `${Math.random() * 3}s`,
          '--duration': `${3 + Math.random() * 2}s`,
          '--x': `${Math.random() * 100}vw`,
          '--color': confettiColors[Math.floor(Math.random() * confettiColors.length)],
          '--rotation': `${Math.random() * 360}deg`,
          '--scale': `${0.5 + Math.random() * 0.8}`
        }}
      />
    ));
    
    return (
      <div className="confetti-container">
        {confettiPieces}
        
        {/* Celebration message during confetti */}
        {showConfetti && !briefGenerated && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 animate-pulse">
              <div className="text-center space-y-4">
                <div className="text-6xl">🎉</div>
                <h3 className="text-3xl font-bold text-purple-600 jakarta-font">
                  Creating Your Strategy!
                </h3>
                <p className="text-lg text-gray-600 inter-font">
                  Analyzing your responses and building your custom influencer brief...
                </p>
                <div className="flex justify-center space-x-1">
                  <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background: 'linear-gradient(135deg, #1a1a2e 0%, #AB35EE 50%, #6a4c93 100%)'}}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .jakarta-font { 
            font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; 
            font-weight: 600;
            letter-spacing: -0.02em;
          }
          .inter-font { 
            font-family: 'Inter', sans-serif; 
          }
          .table-header {
            background: linear-gradient(135deg, #AB35EE, #9333ea);
          }
          
          /* Confetti Animation Styles */
          .confetti-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
          }
          
          .confetti-piece {
            position: absolute;
            width: 12px;
            height: 12px;
            background: var(--color);
            border-radius: 50%;
            top: -20px;
            left: var(--x);
            transform: scale(var(--scale)) rotate(var(--rotation));
            animation: confetti-fall var(--duration) var(--delay) ease-out forwards;
          }
          
          .confetti-piece:nth-child(3n) {
            border-radius: 2px;
            width: 8px;
            height: 16px;
          }
          
          .confetti-piece:nth-child(4n) {
            border-radius: 0;
            width: 10px;
            height: 10px;
            transform: scale(var(--scale)) rotate(45deg);
          }
          
          .confetti-piece:nth-child(5n) {
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, var(--color), rgba(255,255,255,0.8));
          }
          
          @keyframes confetti-fall {
            0% {
              transform: translateY(-100vh) scale(var(--scale)) rotate(var(--rotation));
              opacity: 1;
            }
            10% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) scale(var(--scale)) rotate(calc(var(--rotation) + 720deg));
              opacity: 0;
            }
          }
          
          /* Extra sparkly confetti pieces */
          .confetti-piece:nth-child(7n) {
            animation: confetti-sparkle var(--duration) var(--delay) ease-out forwards;
            background: radial-gradient(circle, var(--color), transparent);
          }
          
          @keyframes confetti-sparkle {
            0% {
              transform: translateY(-100vh) scale(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
              transform: translateY(-80vh) scale(var(--scale)) rotate(180deg);
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) scale(0) rotate(720deg);
              opacity: 0;
            }
          }
        `}
      </style>
      <div className="max-w-4xl w-full">
        {/* Confetti Effect */}
        <ConfettiEffect />
        
        <div className={`transition-all duration-500 transform ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
          
          {currentScreen === 'welcome' && (
            <div className="text-center space-y-8">
              <div className="relative">
                <div className="absolute inset-0 blur-3xl opacity-30 rounded-full" style={{background: 'linear-gradient(45deg, #AB35EE, #9333ea)'}}></div>
                <h1 className="relative text-6xl font-bold text-white mb-4 tracking-tight jakarta-font">
                  Custom Local Business
                  <span className="block text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(45deg, #AB35EE, #ffffff)'}}>
                    Influencer Strategy Generator
                  </span>
                </h1>
              </div>
              
              <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed inter-font">
                Get a personalized influencer campaign strategy with trending content ideas, viral copy suggestions, and creator recommendations tailored specifically for your local business.
              </p>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto border border-white/20">
                <h3 className="text-2xl font-semibold text-white mb-6 jakarta-font">What You'll Get:</h3>
                <div className="space-y-4 inter-font text-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white text-purple-600 flex items-center justify-center text-sm font-bold">✓</div>
                    <span className="text-lg">Industry-specific trending content strategies</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white text-purple-600 flex items-center justify-center text-sm font-bold">✓</div>
                    <span className="text-lg">Detailed video instructions & talking points</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white text-purple-600 flex items-center justify-center text-sm font-bold">✓</div>
                    <span className="text-lg">Custom influencer offers & compensation guide</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white text-purple-600 flex items-center justify-center text-sm font-bold">✓</div>
                    <span className="text-lg">Complete deliverables timeline</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={startGenerator}
                className="group relative inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-2xl shadow-lg inter-font"
              >
                <span>Create Your Brief</span>
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}

          {currentScreen === 'questions' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex gap-2">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index < currentQuestion
                          ? 'w-12 bg-white' 
                          : index === currentQuestion
                          ? 'w-16 bg-white/70'
                          : 'w-8 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white/80 text-sm font-medium inter-font">
                  {currentQuestion + 1} of {questions.length}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-8 leading-relaxed jakarta-font">
                  {questions[currentQuestion].type === 'creator-recommendation' 
                    ? `Who do you want posting about ${answers.businessName || 'your business'}?`
                    : questions[currentQuestion].text
                  }
                </h2>
                
                {questions[currentQuestion].subtitle && questions[currentQuestion].type !== 'creator-recommendation' && (
                  <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-gray-200 text-sm inter-font mb-3">
                      {questions[currentQuestion].subtitle}
                    </p>
                    {questions[currentQuestion].link && (
                      <a
                        href={questions[currentQuestion].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-200 text-sm inter-font underline transition-colors"
                      >
                        {questions[currentQuestion].linkText}
                      </a>
                    )}
                  </div>
                )}
                
                {questions[currentQuestion].type === 'input' && (
                  <div className="space-y-6">
                    <input
                      type="text"
                      value={answers[questions[currentQuestion].id] || ''}
                      onChange={(e) => handleInputChange(questions[currentQuestion].id, e.target.value)}
                      placeholder={questions[currentQuestion].placeholder}
                      className="w-full px-6 py-4 rounded-2xl bg-white/90 border border-white/30 text-black placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors text-lg inter-font"
                    />
                    
                    <button
                      onClick={nextQuestion}
                      disabled={!answers[questions[currentQuestion].id]?.trim()}
                      className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 inter-font"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {questions[currentQuestion].type === 'textarea' && (
                  <div className="space-y-6">
                    <textarea
                      rows={4}
                      value={answers[questions[currentQuestion].id] || ''}
                      onChange={(e) => handleInputChange(questions[currentQuestion].id, e.target.value)}
                      placeholder={questions[currentQuestion].placeholder}
                      className="w-full px-6 py-4 rounded-2xl bg-white/90 border border-white/30 text-black placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors text-lg inter-font resize-none"
                    />
                    
                    <button
                      onClick={nextQuestion}
                      disabled={!answers[questions[currentQuestion].id]?.trim()}
                      className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 inter-font"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {questions[currentQuestion].type === 'handles' && (
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      {(answers.platforms || []).map((platform) => (
                        <div key={platform} className="flex items-center gap-4">
                          <div className="flex items-center gap-2 w-32">
                            {getSocialIcon(platform)}
                            <span className="text-white capitalize inter-font">{platform}</span>
                          </div>
                          <input
                            type="text"
                            value={answers.socialHandles?.[platform] || ''}
                            onChange={(e) => handleHandlesChange(platform, e.target.value)}
                            placeholder="@yourhandle"
                            className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-black placeholder-gray-500 focus:outline-none focus:border-white/60 transition-colors inter-font"
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={nextQuestion}
                      className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 inter-font"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {questions[currentQuestion].type === 'creator-recommendation' && (
                  <div className="space-y-6">
                    {(() => {
                      const businessData = analyzeBusinessHighlights(answers.businessHighlights);
                      const recommendations = getCreatorRecommendations(answers.industry, businessData);
                      
                      return (
                        <div className="space-y-4">
                          {recommendations.map((rec, index) => {
                            const isSelected = (answers.creatorTypes || []).includes(rec);
                            return (
                              <button
                                key={index}
                                onClick={() => handleAnswer('creatorTypes', rec, true)}
                                className={`text-left p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg w-full ${
                                  isSelected 
                                    ? 'bg-white text-purple-600 border-white' 
                                    : 'bg-white/5 border-white/30 text-white hover:bg-white/10 hover:border-white/50'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-lg">✅</span>
                                  <span className="text-lg font-medium inter-font">{rec}</span>
                                </div>
                              </button>
                            );
                          })}
                          
                          <div className="mt-6">
                            <label className="block text-white font-medium mb-2 inter-font">
                              + Add your own: (optional)
                            </label>
                            <input
                              type="text"
                              value={answers.customCreatorTypes || ''}
                              onChange={(e) => handleInputChange('customCreatorTypes', e.target.value)}
                              placeholder="e.g., coffee lovers, travel bloggers..."
                              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-black placeholder-gray-500 focus:outline-none focus:border-white/60 transition-colors inter-font"
                            />
                          </div>
                          
                          <div className="flex justify-end mt-6">
                            <button
                              onClick={nextQuestion}
                              className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 inter-font"
                            >
                              <span>Continue</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {(questions[currentQuestion].type === 'single' || questions[currentQuestion].type === 'multiple') && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {questions[currentQuestion].options.map((option, index) => {
                        const isSelected = questions[currentQuestion].type === 'multiple' 
                          ? (answers[questions[currentQuestion].id] || []).includes(option.value)
                          : answers[questions[currentQuestion].id] === option.value;
                        
                        return (
                          <button
                            key={index}
                            onClick={() => handleAnswer(questions[currentQuestion].id, option.value, questions[currentQuestion].type === 'multiple')}
                            className={`text-left p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                              isSelected 
                                ? 'bg-white text-purple-600 border-white' 
                                : 'bg-white/5 border-white/30 text-white hover:bg-white/10 hover:border-white/50'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-2xl">{option.icon}</span>
                              <span className="text-lg font-medium inter-font">{option.text}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom budget input field */}
                    {questions[currentQuestion].id === 'budget' && answers.budget === 'custom' && (
                      <div className="mb-6">
                        <label className="block text-white font-medium mb-2 inter-font">
                          What's your budget range?
                        </label>
                        <input
                          type="text"
                          value={answers.customBudget || ''}
                          onChange={(e) => handleInputChange('customBudget', e.target.value)}
                          placeholder="e.g., $100-300 per month, $50 per post, etc."
                          className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-black placeholder-gray-500 focus:outline-none focus:border-white/60 transition-colors inter-font"
                        />
                        <div className="flex justify-end mt-4">
                          <button
                            onClick={nextQuestion}
                            disabled={!answers.customBudget?.trim()}
                            className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 inter-font"
                          >
                            <span>Continue</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {questions[currentQuestion].type === 'multiple' && (
                      <div className="flex justify-end">
                        <button
                          onClick={nextQuestion}
                          disabled={!answers[questions[currentQuestion].id] || answers[questions[currentQuestion].id].length === 0}
                          className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 inter-font"
                        >
                          <span>Continue</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Single choice continue button - only show if not custom budget */}
                    {questions[currentQuestion].type === 'single' && !(questions[currentQuestion].id === 'budget' && answers.budget === 'custom') && (
                      <div className="flex justify-end">
                        <button
                          onClick={nextQuestion}
                          disabled={!answers[questions[currentQuestion].id]}
                          className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 inter-font"
                        >
                          <span>Continue</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {/* Back button for questions screen */}
              {(currentQuestion > 0 || currentScreen === 'questions') && (
                <div className="flex justify-start">
                  <button
                    onClick={goBack}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105 inter-font border border-white/20"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    <span>Back</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {currentScreen === 'no-budget' && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-white">
                  <DollarSign className="w-10 h-10 text-purple-600" />
                </div>
                
                <h2 className="text-4xl font-bold text-white mb-4 jakarta-font">
                  Here's What You Need to Know
                </h2>
                
                <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed mb-8 inter-font">
                  Even without a cash budget, influencer marketing can work - but you'll still need to provide value to creators.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl space-y-6 border border-white/20">
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white mb-4 jakarta-font">💡 Why Influencer Marketing Works</h3>
                  <div className="bg-white/5 rounded-2xl p-6 space-y-3 border border-white/10">
                    <p className="text-gray-100 inter-font">• <strong className="text-white">Builds Trust:</strong> 92% of consumers trust recommendations from people over brands</p>
                    <p className="text-gray-100 inter-font">• <strong className="text-white">Increases Reach:</strong> Tap into established audiences that already trust the creator</p>
                    <p className="text-gray-100 inter-font">• <strong className="text-white">Drives Action:</strong> Authentic endorsements convert better than traditional ads</p>
                    <p className="text-gray-100 inter-font">• <strong className="text-white">Cost Effective:</strong> Higher ROI than most traditional marketing channels</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white mb-4 jakarta-font">🚀 The Relay Advantage</h3>
                  <div className="bg-white/5 rounded-2xl p-6 space-y-4 border border-white/10">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white font-semibold mb-2 inter-font">📊 DIY Approach Costs:</h4>
                        <ul className="text-gray-100 text-sm space-y-1 inter-font">
                          <li>• Your time (10-15 hours/week = $500+ value)</li>
                          <li>• Premium experiences ($200-600 per creator)</li>
                          <li>• Trial and error with untested creators</li>
                          <li>• No guarantee of quality content</li>
                          <li>• Managing multiple creator relationships</li>
                          <li>• <strong className="text-red-300">Total: $700-1,100+ per creator</strong></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2 inter-font">✅ Relay Handles Everything:</h4>
                        <ul className="text-gray-100 text-sm space-y-1 inter-font">
                          <li>• Monthly package starting at $99.99</li>
                          <li>• Experience costs ($75-100 per creator)</li>
                          <li>• Pre-vetted creator community</li>
                          <li>• Professional content guaranteed</li>
                          <li>• Full campaign management included</li>
                          <li>• <strong className="text-green-300">Total: $175-200 per creator</strong></li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-purple-500/20 rounded border border-purple-400/30">
                      <p className="text-purple-200 text-sm inter-font text-center">
                        <strong>Bottom Line:</strong> DIY costs $700-1,100+ per creator when you factor in your time and premium experiences. 
                        Relay costs $175-200 per creator total, saving you 70-84% while delivering professional results and freeing up your time.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <a
                    href="https://www.run-relay.com/start2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg inter-font"
                  >
                    <span>See Relay Packages</span>
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                  <p className="text-gray-200 text-sm inter-font">
                    Compare costs • No setup fees • Cancel anytime
                  </p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <button
                  onClick={restart}
                  className="group relative inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-2xl shadow-lg inter-font border border-white/20"
                >
                  <span>Start Over</span>
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
                
                {/* Back button for no-budget screen */}
                <div className="flex justify-start mt-8">
                  <button
                    onClick={goBack}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105 inter-font border border-white/20"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    <span>Back</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentScreen === 'email' && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-white text-4xl">
                  🚀
                </div>
                
                <h2 className="text-4xl font-bold text-white mb-4 jakarta-font">
                  Your Small Business Influencer Strategy Is Ready!
                </h2>
                
                <p className="text-xl text-gray-100 max-w-lg mx-auto leading-relaxed mb-8 inter-font">
                  Enter your email to get your custom strategy—built around your goals, budget, and key talking points. Perfect for small businesses ready to grow with local creators.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-md mx-auto border border-white/20">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2 inter-font">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-black placeholder-gray-500 focus:outline-none focus:border-white/60 transition-colors inter-font"
                    />
                  </div>
                  
                  <button
                    onClick={handleEmailSubmit}
                    disabled={!userEmail.trim()}
                    className="w-full bg-white text-purple-600 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 inter-font transform active:scale-95"
                  >
                    {showConfetti ? (
                      <span className="flex items-center justify-center gap-2">
                        <span>Creating Magic</span>
                        <span className="animate-spin">✨</span>
                      </span>
                    ) : (
                      'Show Me My Strategy'
                    )}
                  </button>
                  
                  <p className="text-gray-300 text-sm text-center inter-font">
                    We'll email you the complete strategy and connect you with our team.
                  </p>
                </div>
              </div>
              
              {/* Back button for email screen */}
              <div className="flex justify-start">
                <button
                  onClick={goBack}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105 inter-font border border-white/20"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  <span>Back</span>
                </button>
              </div>
            </div>
          )}

          {currentScreen === 'result' && brief && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-bold text-white mb-2 jakarta-font">
                  {brief.businessName}'s Local Influencer Strategy Game Plan
                </h2>
                <p className="text-lg text-gray-200 inter-font">
                  Presented to you by <a 
                    href="https://www.run-relay.com/brands" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300 underline transition-colors"
                  >
                    Relay
                  </a>
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl space-y-8 border border-white/20">
                
                {/* Business Overview */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white flex items-center gap-3 jakarta-font">
                    <Building className="w-6 h-6" />
                    {brief.businessName} Overview
                  </h3>
                  <div className="bg-white/5 rounded-2xl p-6 space-y-3 border border-white/10">
                    <p className="text-gray-100 leading-relaxed inter-font">
                      <strong className="text-white">Business Name:</strong> {brief.businessName}
                    </p>
                    <p className="text-gray-100 leading-relaxed inter-font">
                      <strong className="text-white">Industry:</strong> {brief.industry}
                    </p>
                    <p className="text-gray-100 leading-relaxed inter-font">
                      <strong className="text-white">Campaign Goals:</strong> {Array.isArray(brief.goal) ? brief.goal.join(', ') : brief.goal}
                    </p>
                    <p className="text-gray-100 leading-relaxed inter-font">
                      <strong className="text-white">Target Audience:</strong> {Array.isArray(brief.audience) ? brief.audience.join(', ') : brief.audience}
                    </p>
                    {brief.businessHighlights && (
                      <div>
                        <strong className="text-white">What Makes You Special:</strong>
                        <p className="text-gray-100 mt-2 italic">{brief.businessHighlights}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white flex items-center gap-3 jakarta-font">
                    <Target className="w-6 h-6" />
                    Want Us to Run This For You?
                  </h3>
                  <div className="bg-white/5 rounded-2xl p-8 text-center border border-white/10">
                    <h4 className="text-xl font-bold text-white mb-4 inter-font">
                      You focus on running {brief.businessName}, we'll handle everything else
                    </h4>
                    <p className="text-gray-100 mb-6 inter-font leading-relaxed">
                      Creator outreach, content creation, and tracking. Most {brief.industry} businesses like yours start seeing new customers within 30 days.
                    </p>
                    <div className="space-y-4">
                      <div className="bg-white/10 rounded-xl p-4 mb-6 border border-white/20 text-left">
                        <p className="text-white font-semibold mb-3 inter-font">✅ With Relay, You Get:</p>
                        <ul className="text-gray-100 text-sm space-y-2 inter-font">
                          <li>• <strong className="text-white">Trusted local creators</strong> who genuinely love featuring local businesses</li>
                          <li>• <strong className="text-white">Fully managed campaigns</strong>—from creator matching to posting & tracking</li>
                          <li>• <strong className="text-white">Professional-quality content</strong> you can reuse in your own marketing</li>
                          <li>• <strong className="text-white">Flexible monthly plans</strong> (1–10+ creators)</li>
                          <li>• <strong className="text-white">No setup fees, cancel anytime</strong></li>
                        </ul>
                      </div>
                      
                      <a
                        href="https://www.run-relay.com/start2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg inter-font"
                      >
                        <span>Get Started with Relay</span>
                        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </a>
                      <p className="text-gray-200 text-sm inter-font mt-2">
                        Choose your package. Start seeing results this month.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={restart}
                  className="group relative inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-2xl shadow-lg inter-font border border-white/20"
                >
                  <span>Create Another Brief</span>
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfluencerBriefGenerator;
