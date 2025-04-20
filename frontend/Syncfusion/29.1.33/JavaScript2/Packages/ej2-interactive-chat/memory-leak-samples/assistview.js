define(["require", "exports", "../src/ai-assistview/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var aiAssistViewInst;
    var promptsData = [
        {
            prompt: "Can you help me create a summary of the latest trends in AI technology?",
            response: "<div>Sure! Here are the latest trends in AI technology:\n                    <ul>\n                        <li><strong>Generative AI:</strong> Improved models like GPT-4 enhance natural language processing.</li>\n                        <li><strong>AI in Healthcare:</strong> AI aids in diagnostics and personalized treatments.</li>\n                        <li><strong>Autonomous Systems:</strong> Self-driving cars and drones are advancing.</li>\n                        <li><strong>AI Ethics:</strong> Focus on bias, privacy, and accountability in AI.</li>\n                        <li><strong>Edge AI:</strong> Processing moves to local devices, boosting IoT.</li>\n                    </ul>\n                </div>"
        }
    ];
    var assistViews = [
        {
            name: "AI Assist",
            iconCss: "e-icons e-ai-assist"
        }
    ];
    var responseViewSettings = {
        itemClicked: function (args) {
        }
    };
    var assistViewToolbarSettings = {
        itemClicked: function (args) {
        },
        items: [
            { type: 'Input', template: 'Welcome User !', align: 'Right' }
        ]
    };
    document.getElementById('render').addEventListener('click', renderAssistView);
    document.getElementById('destroy').addEventListener('click', destoryAssistView);
    function renderAssistView() {
        aiAssistViewInst = new index_1.AIAssistView({
            promptPlaceholder: "Type your prompt for assistance...",
            promptSuggestionsHeader: "Suggested Prompts",
            promptSuggestions: [
                "How do I set achievable goals at work?",
                "Why do people fly in their dreams?",
                "How can I mitigate the threats during product development?"
            ],
            responseIconCss: "e-icons e-ai-assist",
            prompts: promptsData,
            views: assistViews,
            toolbarSettings: assistViewToolbarSettings,
            responseToolbarSettings: responseViewSettings,
            bannerTemplate: "<div class=\"ai-assist-banner\">\n                                <div class=\"e-icons e-ai-assist\"></div>\n                                <h2>AI Assistance</h2>\n                                <div class=\"ai-assist-banner-subtitle\">Your everyday AI companion</div>\n                            </div>",
            promptRequest: function () {
                setTimeout(function () {
                    var response = "For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.";
                    aiAssistViewInst.addPromptResponse(response);
                }, 1000);
            }
        });
        aiAssistViewInst.appendTo('#defaultAIAssistView');
    }
    function destoryAssistView() {
        if (aiAssistViewInst && !aiAssistViewInst.isDestroyed) {
            aiAssistViewInst.destroy();
        }
    }
});
