import Link from "next/link";
import { MenuItem, ListItemText } from "@mui/material";

interface MenuItemLinkProps {
  href: string;
  text: string;
  closeMenu: () => void;
}

export default function MenuItemLink({ href, text, closeMenu }: MenuItemLinkProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <MenuItem component="a" onClick={closeMenu}>
        <ListItemText primary={text} />
      </MenuItem>
    </Link>
  );
}
