const fs = require('fs');

const filePath = 'backend/supabase/functions/api/services/databaseService.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Fix the syntax error around line 1502
content = content.replace(
  '      ]\n\n  // Trending Topics Methods',
  '      ]\n    } catch (error) {\n      console.error("Error fetching popular content:", error)\n      throw error\n    }\n  },\n\n  // Trending Topics Methods'
);

// Fix the indentation error around line 1518
content = content.replace(
  '        } catch (error) {',
  '    } catch (error) {'
);

fs.writeFileSync(filePath, content);
console.log('✅ Fixed database service syntax errors');
