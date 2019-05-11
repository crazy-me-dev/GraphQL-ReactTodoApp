import React from "react";
import Link from "next/link";

function Home() {
  return (
    <div>
      This is a front page. Would you like to{" "}
      <Link href="/login">
        <a>log in</a>
      </Link>
      ?
    </div>
  );
}

export default Home;
