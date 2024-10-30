import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dagltdgamhmsucrxxexh.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhZ2x0ZGdhbWhtc3Vjcnh4ZXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5NDA1MDUsImV4cCI6MjA0NTUxNjUwNX0.jUY6kULUdI8PKi6miIFVaP8iQtDB2AolaJYX6Ldx5ws";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addTestVisitorData() {
  const testData = [
    { page_url: "/", visitor_id: "user1", session_id: "session1" },
    { page_url: "/", visitor_id: "user2", session_id: "session2" },
    { page_url: "/", visitor_id: "user3", session_id: "session3" },
    //   { page_url: '/res', visitor_id: 'user4', session_id: 'session4' },
    //   { page_url: '/other-page', visitor_id: 'user5', session_id: 'session5' },
  ];

  const { data, error } = await supabase.from("page_views").insert(testData);

  if (error) {
    console.error("Error inserting test data:", error);
  } else {
    console.log("Test data inserted successfully:", data);
  }
}

addTestVisitorData();
