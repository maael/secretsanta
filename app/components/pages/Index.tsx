import Button from "@material-ui/core/Button";
import Link from "next/link";
import React from "react";
export default () => (
  <div style={{ textAlign: "center" }}>
    <div style={{ paddingBottom: 25 }}>
      <Link href="/auth/sign-in">
        <Button variant="contained" color="secondary">
          Login
        </Button>
      </Link>
    </div>
    <img src="/static/imgs/ring-planet.png" width={100} />
    <img src="/static/imgs/santa.png" width={500} />
  </div>
);
